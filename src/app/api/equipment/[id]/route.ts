import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { equipmentInputSchema } from "@/features/equipment/schema";

export async function GET(
  _request: NextRequest,
  ctx: RouteContext<"/api/equipment/[id]">,
) {
  const { id } = await ctx.params;
  const equipment = await prisma.equipment.findUnique({ where: { id } });

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
  const parsed = equipmentInputSchema.partial().safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { vin, photoUrl, notes, ...rest } = parsed.data;

  try {
    const equipment = await prisma.equipment.update({
      where: { id },
      data: {
        ...rest,
        ...(vin !== undefined && { vin: vin || null }),
        ...(photoUrl !== undefined && { photoUrl: photoUrl || null }),
        ...(notes !== undefined && { notes: notes || null }),
      },
    });
    return NextResponse.json(equipment);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function DELETE(
  _request: NextRequest,
  ctx: RouteContext<"/api/equipment/[id]">,
) {
  const { id } = await ctx.params;

  try {
    await prisma.equipment.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
