import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { EQUIPMENT_STATUSES } from "@/server/schemas/equipment/createEquipmentInputSchema";
import type { EquipmentStatus } from "@/generated/prisma/enums";
import { findAllEquipmentUseCase } from "@/server/useCases/equipment/findAllEquipmentUseCase";
import { createEquipmentAction } from "@/server/actions/equipment/createEquipmentAction";

function isEquipmentStatus(value: string): value is EquipmentStatus {
  return (EQUIPMENT_STATUSES as readonly string[]).includes(value);
}

export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get("status");
  const validStatus = status && isEquipmentStatus(status) ? status : undefined;

  const equipment = await findAllEquipmentUseCase(validStatus);

  return NextResponse.json(equipment);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const equipment = await createEquipmentAction(body);
    return NextResponse.json(equipment, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    throw error;
  }
}
