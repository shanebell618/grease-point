import { describe, expect, it } from "vitest";

import { EquipmentDao } from "@/server/dataAccess/EquipmentDao";
import { createMaintenanceUseCase } from "../createMaintenanceUseCase";
import { equipmentFactory } from "@/test/factories/equipmentFactory";

describe("createMaintenanceUseCase", () => {
  it("persists a maintenance record with the given attributes", async () => {
    const equipment = await equipmentFactory.create();

    const result = await createMaintenanceUseCase({
      equipmentId: equipment.id,
      serviceDate: new Date("2026-01-15"),
      description: "Replaced hydraulic hose",
      status: "COMPLETE",
    });

    expect(result).toMatchObject({
      equipmentId: equipment.id,
      description: "Replaced hydraulic hose",
      status: "COMPLETE",
    });
    expect(result.completedAt).not.toBeNull();
  });

  it("sets the equipment to OUT_OF_SERVICE when created as IN_PROGRESS", async () => {
    const equipment = await equipmentFactory.create({ status: "ACTIVE" });

    await createMaintenanceUseCase({
      equipmentId: equipment.id,
      serviceDate: new Date("2026-01-15"),
      description: "Engine rebuild",
      status: "IN_PROGRESS",
    });

    const updatedEquipment = await EquipmentDao.getById(equipment.id);
    expect(updatedEquipment?.status).toBe("OUT_OF_SERVICE");
  });

  it("leaves the equipment's status alone when created as SCHEDULED", async () => {
    const equipment = await equipmentFactory.create({ status: "ACTIVE" });

    await createMaintenanceUseCase({
      equipmentId: equipment.id,
      serviceDate: new Date("2026-01-15"),
      description: "Oil change",
      status: "SCHEDULED",
    });

    const updatedEquipment = await EquipmentDao.getById(equipment.id);
    expect(updatedEquipment?.status).toBe("ACTIVE");
  });
});
