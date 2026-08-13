import { describe, expect, it } from "vitest";
import { equipmentFactory } from "@/test/factories/equipmentFactory";

import { EquipmentDao } from "../EquipmentDao";

describe("EquipmentDao.getAllByStatus", () => {
  it("filters by the given status", async () => {
    await equipmentFactory.create({ status: "ACTIVE" });
    await equipmentFactory.create({ status: "RETIRED" });

    const result = await EquipmentDao.getAllByStatus("RETIRED");

    expect(result).toHaveLength(1);
    expect(result[0].status).toBe("RETIRED");
  });
});
