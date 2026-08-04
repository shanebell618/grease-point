import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { getEquipmentByIdUseCase } from "@/server/useCases/equipment/getEquipmentByIdUseCase";
import { updateEquipmentAction } from "@/server/actions/equipment/updateEquipmentAction";
import { deleteEquipmentAction } from "@/server/actions/equipment/deleteEquipmentAction";
import { NotFoundError } from "@/server/useCases/errors";

export async function GET(
  _request: NextRequest,
  ctx: RouteContext<"/api/equipment/[id]">,
) {
  const { id } = await ctx.params;
  const equipment = await getEquipmentByIdUseCase(id);

  if (!equipment) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(equipment);
}

export async function PATCH(
  request: NextRequest,
  ctx: RouteContext<"/api/equipment/[id]">,
) {
  const { id } = await ctx.params;
  const body = await request.json();

  try {
    const equipment = await updateEquipmentAction(id, body);
    return NextResponse.json(equipment);
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
  ctx: RouteContext<"/api/equipment/[id]">,
) {
  const { id } = await ctx.params;

  try {
    await deleteEquipmentAction(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    throw error;
  }
}
