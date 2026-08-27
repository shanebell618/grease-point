import { describe, expect, it } from "vitest";
import { equipmentFactory } from "@/test/factories/equipmentFactory";

import { EquipmentDao } from "../EquipmentDao";

describe("EquipmentDao.getAll", () => {
  it("returns equipment sorted by name", async () => {
    await equipmentFactory.create({ name: "Skid Steer" });
    await equipmentFactory.create({ name: "Excavator" });

    const result = await EquipmentDao.getAll();

    expect(result.map((item) => item.name)).toEqual([
      "Excavator",
      "Skid Steer",
    ]);
  });

  it("returns an empty array when there is no equipment", async () => {
    const result = await EquipmentDao.getAll();
    expect(result).toEqual([]);
  });
});
