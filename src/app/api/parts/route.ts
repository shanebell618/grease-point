import { NextRequest, NextResponse } from "next/server";

import { ZodError } from "zod";
import { createPartAction } from "@/server/actions/parts/createPartAction";
import { getAllPartsUseCase } from "@/server/useCases/parts/getAllPartsUseCase";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search") ?? undefined;
  const parts = await getAllPartsUseCase(search);
  return NextResponse.json(parts);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const part = await createPartAction(body);
    return NextResponse.json(part, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    throw error;
  }
}
