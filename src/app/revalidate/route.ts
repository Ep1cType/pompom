"use server";

import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const params = new URL(request.url);
  if (params.searchParams.get("key") === process.env.NEXT_PUBLIC_VALIDATE_KEY) {
    revalidateTag("character");
    return NextResponse.json({ message: "Success revalidate" });
  }
  return NextResponse.json({ message: "Invalid key" });
}
