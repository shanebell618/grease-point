import { describe, expect, it } from "vitest";

import { equipmentFactory } from "@/test/factories/equipmentFactory";
import { maintenanceFactory } from "@/test/factories/maintenanceFactory";
import { getAllMaintenanceByEquipmentIdUseCase } from "../getAllMaintenanceByEquipmentIdUseCase";

describe("getAllMaintenanceByEquipmentIdUseCase", () => {
  it("returns only records for the given equipmentId", async () => {
    const equipment = await equipmentFactory.create();
    await maintenanceFactory.create({ equipmentId: equipment.id });
    await maintenanceFactory.create();

    const result = await getAllMaintenanceByEquipmentIdUseCase(equipment.id);

    expect(result).toHaveLength(1);
    expect(result[0]?.equipmentId).toBe(equipment.id);
  });

  it("returns an empty array when the equipment has no maintenance records", async () => {
    const equipment = await equipmentFactory.create();

    const result = await getAllMaintenanceByEquipmentIdUseCase(equipment.id);

    expect(result).toEqual([]);
  });
});
