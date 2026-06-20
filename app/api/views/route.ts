import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const VIEW_COUNT_FILE = path.join(process.cwd(), "view-count.json");
const VIEW_COUNT_KEY = process.env.VIEW_COUNT_KEY ?? "portfolio:views";
const REDIS_REST_URL =
  process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const REDIS_REST_TOKEN =
  process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

export const dynamic = "force-dynamic";

async function redisCommand<T>(command: string[]): Promise<T | null> {
  if (!REDIS_REST_URL || !REDIS_REST_TOKEN) return null;

  try {
    const response = await fetch(REDIS_REST_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REDIS_REST_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
      cache: "no-store",
    });

    if (!response.ok) return null;

    const data = (await response.json()) as { result?: T };
    return data.result ?? null;
  } catch (error) {
    console.error("Failed to read shared view count:", error);
    return null;
  }
}

async function getViewCount(): Promise<number> {
  const sharedCount = await redisCommand<string | number>([
    "GET",
    VIEW_COUNT_KEY,
  ]);

  if (sharedCount !== null) {
    return Number(sharedCount) || 0;
  }

  try {
    const data = await fs.readFile(VIEW_COUNT_FILE, "utf-8");
    const parsed = JSON.parse(data);
    return parsed.count || 0;
  } catch (error) {
    // File doesn't exist or is invalid, return 0
    return 0;
  }
}

async function incrementSharedViewCount(): Promise<number | null> {
  const count = await redisCommand<number>(["INCR", VIEW_COUNT_KEY]);
  return typeof count === "number" ? count : null;
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
    const count = await getViewCount();
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}

export async function POST() {
  try {
    const sharedCount = await incrementSharedViewCount();

    if (sharedCount !== null) {
      return NextResponse.json({ count: sharedCount });
    }

    const currentCount = await getViewCount();
    const newCount = currentCount + 1;
    await saveViewCount(newCount);
    return NextResponse.json({ count: newCount });
  } catch (error) {
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}
