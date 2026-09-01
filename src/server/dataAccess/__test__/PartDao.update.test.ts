import { describe, expect, it } from "vitest";

import { PartDao } from "../PartDao";
import { partFactory } from "@/test/factories/partFactory";

describe("PartDao.update", () => {
  it("updates only the provided fields", async () => {
    const part = await partFactory.create({
      name: "Oil Filter",
      quantityOnHand: 10,
    });

    const result = await PartDao.update(part.id, { quantityOnHand: 8 });

    expect(result.quantityOnHand).toBe(8);
    expect(result.name).toBe("Oil Filter");
  });
});
