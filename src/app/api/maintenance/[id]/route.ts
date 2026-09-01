import { NextRequest, NextResponse } from "next/server";

import { InsufficientStockError } from "@/server/useCases/errors";
import { NotFoundError } from "@/server/useCases/errors";
import { ZodError } from "zod";
import { deleteMaintenanceAction } from "@/server/actions/maintenance/deleteMaintenanceAction";
import { getMaintenanceByIdUseCase } from "@/server/useCases/maintenance/getMaintenanceByIdUseCase";
import { updateMaintenanceAction } from "@/server/actions/maintenance/updateMaintenanceAction";

export async function GET(
  _request: NextRequest,
  ctx: RouteContext<"/api/maintenance/[id]">,
) {
  const { id } = await ctx.params;
  const maintenance = await getMaintenanceByIdUseCase(id);

  if (!maintenance) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(maintenance);
}

export async function PATCH(
  request: NextRequest,
  ctx: RouteContext<"/api/maintenance/[id]">,
) {
  const { id } = await ctx.params;
  const body = await request.json();

  try {
    const maintenance = await updateMaintenanceAction(id, body);
    return NextResponse.json(maintenance);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    if (error instanceof NotFoundError) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    if (error instanceof InsufficientStockError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    throw error;
  }
}

export async function DELETE(
  _request: NextRequest,
  ctx: RouteContext<"/api/maintenance/[id]">,
) {
  const { id } = await ctx.params;

  try {
    await deleteMaintenanceAction(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    throw error;
  }
}
