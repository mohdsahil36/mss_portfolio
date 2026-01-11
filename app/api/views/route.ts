import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const VIEW_COUNT_FILE = path.join(process.cwd(), "view-count.json");

async function getViewCount(): Promise<number> {
  try {
    const data = await fs.readFile(VIEW_COUNT_FILE, "utf-8");
    const parsed = JSON.parse(data);
    return parsed.count || 0;
  } catch (error) {
    // File doesn't exist or is invalid, return 0
    return 0;
  }
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
    const currentCount = await getViewCount();
    const newCount = currentCount + 1;
    await saveViewCount(newCount);
    return NextResponse.json({ count: newCount });
  } catch (error) {
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}

