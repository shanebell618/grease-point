import { describe, expect, it } from "vitest";
import { partFactory } from "@/test/factories/partFactory";

import { getAllPartsUseCase } from "../getAllPartsUseCase";

describe("getAllPartsUseCase", () => {
  it("returns all parts", async () => {
    await partFactory.create({ name: "Oil Filter" });
    await partFactory.create({ name: "Air Filter" });

    const result = await getAllPartsUseCase();

    expect(result).toHaveLength(2);
  });

  it("returns an empty array when there are no parts", async () => {
    const result = await getAllPartsUseCase();
    expect(result).toEqual([]);
  });

  it("filters by search when given", async () => {
    await partFactory.create({ name: "Oil Filter", sku: "OF-100" });
    await partFactory.create({ name: "Air Filter", sku: "AF-200" });

    const result = await getAllPartsUseCase("Oil");

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("Oil Filter");
  });
});
