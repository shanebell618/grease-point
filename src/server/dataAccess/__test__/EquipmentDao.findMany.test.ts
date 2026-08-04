import { describe, expect, it } from "vitest";
import { equipmentFactory } from "@/test/factories/equipmentFactory";

import { EquipmentDao } from "../EquipmentDao";

describe("EquipmentDao.findMany", () => {
  it("returns equipment sorted by name", async () => {
    await equipmentFactory.create({ name: "Skid Steer" });
    await equipmentFactory.create({ name: "Excavator" });

    const result = await EquipmentDao.findMany();

    expect(result.map((item) => item.name)).toEqual([
      "Excavator",
      "Skid Steer",
    ]);
  });

  it("filters by status when provided", async () => {
    await equipmentFactory.create({ status: "ACTIVE" });
    await equipmentFactory.create({ status: "RETIRED" });

    const result = await EquipmentDao.findMany("RETIRED");

    expect(result).toHaveLength(1);
    expect(result[0].status).toBe("RETIRED");
  });

  it("returns an empty array when there is no equipment", async () => {
    const result = await EquipmentDao.findMany();
    expect(result).toEqual([]);
  });
});
