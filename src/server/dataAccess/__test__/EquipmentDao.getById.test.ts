import { describe, expect, it } from "vitest";
import { equipmentFactory } from "@/test/factories/equipmentFactory";

import { EquipmentDao } from "../EquipmentDao";

describe("EquipmentDao.getById", () => {
  it("returns the matching equipment", async () => {
    const equipment = await equipmentFactory.create();

    const result = await EquipmentDao.getById(equipment.id);

    expect(result?.id).toBe(equipment.id);
  });

  it("returns null when nothing matches", async () => {
    const result = await EquipmentDao.getById("does-not-exist");
    expect(result).toBeNull();
  });
});
