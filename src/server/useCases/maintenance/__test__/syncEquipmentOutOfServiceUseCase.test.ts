import { describe, expect, it } from "vitest";

import { EquipmentDao } from "@/server/dataAccess/EquipmentDao";
import { equipmentFactory } from "@/test/factories/equipmentFactory";
import { syncEquipmentOutOfServiceUseCase } from "../syncEquipmentOutOfServiceUseCase";

describe("syncEquipmentOutOfServiceUseCase", () => {
  it("sets an active equipment's status to OUT_OF_SERVICE", async () => {
    const equipment = await equipmentFactory.create({ status: "ACTIVE" });

    await syncEquipmentOutOfServiceUseCase(equipment.id);

    const updated = await EquipmentDao.getById(equipment.id);
    expect(updated?.status).toBe("OUT_OF_SERVICE");
  });

  it("does not override a RETIRED status", async () => {
    const equipment = await equipmentFactory.create({ status: "RETIRED" });

    await syncEquipmentOutOfServiceUseCase(equipment.id);

    const updated = await EquipmentDao.getById(equipment.id);
    expect(updated?.status).toBe("RETIRED");
  });

  it("does nothing when the equipment does not exist", async () => {
    await expect(
      syncEquipmentOutOfServiceUseCase("does-not-exist"),
    ).resolves.not.toThrow();
  });
});
