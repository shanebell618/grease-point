import { describe, expect, it } from "vitest";

import { EquipmentDao } from "../EquipmentDao";
import { equipmentFactory } from "@/test/factories/equipmentFactory";

describe("EquipmentDao.update", () => {
  it("updates only the given fields", async () => {
    const equipment = await equipmentFactory.create({
      status: "ACTIVE",
      operatingHours: 10,
    });

    const result = await EquipmentDao.update(equipment.id, {
      status: "RETIRED",
    });

    expect(result.status).toBe("RETIRED");
    expect(result.operatingHours).toBe(10);
  });

  it("throws when the equipment does not exist", async () => {
    await expect(
      EquipmentDao.update("does-not-exist", { status: "RETIRED" }),
    ).rejects.toThrow();
  });
});
