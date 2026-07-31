import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  EQUIPMENT_STATUSES,
  equipmentInputSchema,
} from "@/features/equipment/schema";
import type { EquipmentStatus } from "@/features/equipment/types";

function isEquipmentStatus(value: string): value is EquipmentStatus {
  return (EQUIPMENT_STATUSES as readonly string[]).includes(value);
}

export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get("status");

  const equipment = await prisma.equipment.findMany({
    where: status && isEquipmentStatus(status) ? { status } : undefined,
    orderBy: { name: "asc" },
  });

  return NextResponse.json(equipment);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = equipmentInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { vin, photoUrl, notes, ...rest } = parsed.data;
  const equipment = await prisma.equipment.create({
    data: {
      ...rest,
      vin: vin || null,
      photoUrl: photoUrl || null,
      notes: notes || null,
    },
  });

  return NextResponse.json(equipment, { status: 201 });
}
