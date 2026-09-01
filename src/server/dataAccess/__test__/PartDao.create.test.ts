import { describe, expect, it } from "vitest";

import { PartDao } from "../PartDao";

describe("PartDao.create", () => {
  it("persists a new part row", async () => {
    const result = await PartDao.create({
      sku: "OF-100",
      name: "Oil Filter",
      quantityOnHand: 10,
      reorderThreshold: 2,
    });

    expect(result.id).toBeDefined();
    expect(result.name).toBe("Oil Filter");

    const found = await PartDao.getById(result.id);
    expect(found).not.toBeNull();
  });
});
