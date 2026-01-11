import { NextResponse } from "next/server";

// Simple in-memory counter (resets on server restart)
// For production, consider using a database or external service
let viewCount = 0;

export async function GET() {
  return NextResponse.json({ count: viewCount });
}

export async function POST() {
  viewCount += 1;
  return NextResponse.json({ count: viewCount });
}

