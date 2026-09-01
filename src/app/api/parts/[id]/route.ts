import { NextRequest, NextResponse } from "next/server";

import { NotFoundError } from "@/server/useCases/errors";
import { ZodError } from "zod";
import { deletePartAction } from "@/server/actions/parts/deletePartAction";
import { getPartByIdUseCase } from "@/server/useCases/parts/getPartByIdUseCase";
import { updatePartAction } from "@/server/actions/parts/updatePartAction";

export async function GET(
  _request: NextRequest,
  ctx: RouteContext<"/api/parts/[id]">,
) {
  const { id } = await ctx.params;
  const part = await getPartByIdUseCase(id);

  if (!part) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(part);
}

export async function PATCH(
  request: NextRequest,
  ctx: RouteContext<"/api/parts/[id]">,
) {
  const { id } = await ctx.params;
  const body = await request.json();

  try {
    const part = await updatePartAction(id, body);
    return NextResponse.json(part);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    if (error instanceof NotFoundError) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    throw error;
  }
}

export async function DELETE(
  _request: NextRequest,
  ctx: RouteContext<"/api/parts/[id]">,
) {
  const { id } = await ctx.params;

  try {
    await deletePartAction(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    throw error;
  }
}
