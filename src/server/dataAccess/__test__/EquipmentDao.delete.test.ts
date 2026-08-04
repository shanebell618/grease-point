import { describe, expect, it } from "vitest";
import { equipmentFactory } from "@/test/factories/equipmentFactory";

import { EquipmentDao } from "../EquipmentDao";

describe("EquipmentDao.delete", () => {
  it("removes the equipment row", async () => {
    const equipment = await equipmentFactory.create();

    await EquipmentDao.delete(equipment.id);

    const found = await EquipmentDao.getById(equipment.id);
    expect(found).toBeNull();
  });

  it("throws when the equipment does not exist", async () => {
    await expect(EquipmentDao.delete("does-not-exist")).rejects.toThrow();
  });
});
