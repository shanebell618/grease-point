import { NextRequest, NextResponse } from "next/server";

import { ZodError } from "zod";
import { createMaintenanceAction } from "@/server/actions/maintenance/createMaintenanceAction";
import { getAllMaintenanceByEquipmentIdUseCase } from "@/server/useCases/maintenance/getAllMaintenanceByEquipmentIdUseCase";
import { getAllMaintenanceUseCase } from "@/server/useCases/maintenance/getAllMaintenanceUseCase";

export async function GET(request: NextRequest) {
  const equipmentId = request.nextUrl.searchParams.get("equipmentId");

  const maintenance = equipmentId
    ? await getAllMaintenanceByEquipmentIdUseCase(equipmentId)
    : await getAllMaintenanceUseCase();

  return NextResponse.json(maintenance);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const maintenance = await createMaintenanceAction(body);
    return NextResponse.json(maintenance, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    throw error;
  }
}
