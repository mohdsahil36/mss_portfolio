import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const VIEW_COUNT_FILE = path.join(process.cwd(), "view-count.json");
const VIEW_COUNT_KEY = process.env.VIEW_COUNT_KEY ?? "portfolio:views";
const REDIS_REST_URL =
  process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const REDIS_REST_TOKEN =
  process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const HAS_REDIS_CONFIG = Boolean(REDIS_REST_URL && REDIS_REST_TOKEN);

export const dynamic = "force-dynamic";

async function redisCommand<T>(command: string[]): Promise<T | null> {
  if (!REDIS_REST_URL || !REDIS_REST_TOKEN) return null;

  const response = await fetch(REDIS_REST_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Redis command failed with ${response.status}: ${errorBody}`,
    );
  }

  const data = (await response.json()) as { result?: T };
  return data.result ?? null;
}

async function getLocalViewCount(): Promise<number> {
  try {
    const data = await fs.readFile(VIEW_COUNT_FILE, "utf-8");
    const parsed = JSON.parse(data);
    return parsed.count || 0;
  } catch (error) {
    // File doesn't exist or is invalid, return 0
    return 0;
  }
}

async function getViewCount(): Promise<{
  count: number;
  source: "redis" | "file";
}> {
  if (HAS_REDIS_CONFIG) {
    const sharedCount = await redisCommand<string | number>([
      "GET",
      VIEW_COUNT_KEY,
    ]);

    return {
      count: Number(sharedCount) || 0,
      source: "redis",
    };
  }

  return {
    count: await getLocalViewCount(),
    source: "file",
  };
}

async function incrementSharedViewCount(): Promise<number | null> {
  const count = await redisCommand<number | string>(["INCR", VIEW_COUNT_KEY]);
  return count !== null ? Number(count) || 0 : null;
}

async function saveViewCount(count: number): Promise<void> {
  try {
    await fs.writeFile(
      VIEW_COUNT_FILE,
      JSON.stringify({ count }, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error("Failed to save view count:", error);
  }
}

export async function GET() {
  try {
    const viewCount = await getViewCount();
    return NextResponse.json({
      ...viewCount,
      redisConfigured: HAS_REDIS_CONFIG,
    });
  } catch (error) {
    console.error("Failed to get view count:", error);
    return NextResponse.json(
      { count: 0, source: "error", redisConfigured: HAS_REDIS_CONFIG },
      { status: 500 },
    );
  }
}

export async function POST() {
  try {
    if (HAS_REDIS_CONFIG) {
      const sharedCount = await incrementSharedViewCount();

      return NextResponse.json({
        count: sharedCount ?? 0,
        source: "redis",
        redisConfigured: true,
      });
    }

    const currentCount = await getLocalViewCount();
    const newCount = currentCount + 1;
    await saveViewCount(newCount);
    return NextResponse.json({
      count: newCount,
      source: "file",
      redisConfigured: false,
    });
  } catch (error) {
    console.error("Failed to increment view count:", error);
    return NextResponse.json(
      { count: 0, source: "error", redisConfigured: HAS_REDIS_CONFIG },
      { status: 500 },
    );
  }
}
