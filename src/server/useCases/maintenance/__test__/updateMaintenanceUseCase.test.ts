import { describe, expect, it } from "vitest";

import { EquipmentDao } from "@/server/dataAccess/EquipmentDao";
import { NotFoundError } from "@/server/useCases/errors";
import { equipmentFactory } from "@/test/factories/equipmentFactory";
import { maintenanceFactory } from "@/test/factories/maintenanceFactory";
import { updateMaintenanceUseCase } from "../updateMaintenanceUseCase";

describe("updateMaintenanceUseCase", () => {
  it("updates only the provided fields", async () => {
    const maintenance = await maintenanceFactory.create({
      status: "SCHEDULED",
      description: "Oil change",
    });

    const result = await updateMaintenanceUseCase(maintenance.id, {
      status: "COMPLETE",
    });

    expect(result.status).toBe("COMPLETE");
    expect(result.description).toBe("Oil change");
  });

  it("throws NotFoundError when the maintenance record does not exist", async () => {
    await expect(
      updateMaintenanceUseCase("does-not-exist", { status: "COMPLETE" }),
    ).rejects.toThrow(NotFoundError);
  });

  it("sets the equipment to OUT_OF_SERVICE when the record moves into IN_PROGRESS", async () => {
    const equipment = await equipmentFactory.create({ status: "ACTIVE" });
    const maintenance = await maintenanceFactory.create({
      equipmentId: equipment.id,
      status: "SCHEDULED",
    });

    await updateMaintenanceUseCase(maintenance.id, { status: "IN_PROGRESS" });

    const updatedEquipment = await EquipmentDao.getById(equipment.id);
    expect(updatedEquipment?.status).toBe("OUT_OF_SERVICE");
  });

  it("does not touch the equipment when the record leaves IN_PROGRESS", async () => {
    const equipment = await equipmentFactory.create({
      status: "OUT_OF_SERVICE",
    });
    const maintenance = await maintenanceFactory.create({
      equipmentId: equipment.id,
      status: "IN_PROGRESS",
    });

    await updateMaintenanceUseCase(maintenance.id, { status: "COMPLETE" });

    const updatedEquipment = await EquipmentDao.getById(equipment.id);
    expect(updatedEquipment?.status).toBe("OUT_OF_SERVICE");
  });

  it("does not re-sync the equipment when the record was already IN_PROGRESS", async () => {
    const equipment = await equipmentFactory.create({ status: "ACTIVE" });
    const maintenance = await maintenanceFactory.create({
      equipmentId: equipment.id,
      status: "IN_PROGRESS",
    });

    await updateMaintenanceUseCase(maintenance.id, { description: "Updated" });

    const updatedEquipment = await EquipmentDao.getById(equipment.id);
    expect(updatedEquipment?.status).toBe("ACTIVE");
  });
});
