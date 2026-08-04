import { describe, expect, it } from "vitest";
import { equipmentFactory } from "@/test/factories/equipmentFactory";

import { EquipmentDao } from "../EquipmentDao";

describe("EquipmentDao.update", () => {
  it("updates only the given fields", async () => {
    const equipment = await equipmentFactory.create({
      status: "ACTIVE",
      engineHours: 10,
    });

    const result = await EquipmentDao.update(equipment.id, {
      status: "RETIRED",
    });

    expect(result.status).toBe("RETIRED");
    expect(result.engineHours).toBe(10);
  });

  it("throws when the equipment does not exist", async () => {
    await expect(
      EquipmentDao.update("does-not-exist", { status: "RETIRED" }),
    ).rejects.toThrow();
  });
});
