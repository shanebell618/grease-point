import { describe, expect, it } from "vitest";

import { EquipmentDao } from "../EquipmentDao";

describe("EquipmentDao.create", () => {
  it("persists a new equipment row", async () => {
    const result = await EquipmentDao.create({
      name: "CAT 320 Excavator",
      status: "ACTIVE",
      vin: "CAT0320XJDR12345",
    });

    expect(result.id).toBeDefined();
    expect(result.name).toBe("CAT 320 Excavator");

    const found = await EquipmentDao.getById(result.id);
    expect(found).not.toBeNull();
  });

  it("defaults status to ACTIVE when omitted", async () => {
    const result = await EquipmentDao.create({
      name: "Bobcat S650",
      vin: "BC-S650-0042",
    });

    expect(result.status).toBe("ACTIVE");
  });
});
