import { describe, expect, it } from "vitest";

import { PartDao } from "../PartDao";
import { partFactory } from "@/test/factories/partFactory";

describe("PartDao.getAll", () => {
  it("returns every part, ordered by name", async () => {
    await partFactory.create({ name: "Oil Filter" });
    await partFactory.create({ name: "Air Filter" });

    const result = await PartDao.getAll();

    expect(result.map((part) => part.name)).toEqual([
      "Air Filter",
      "Oil Filter",
    ]);
  });

  it("filters by name or sku when a search term is given", async () => {
    await partFactory.create({ name: "Oil Filter", sku: "OF-100" });
    await partFactory.create({ name: "Air Filter", sku: "AF-200" });

    const byName = await PartDao.getAll("Oil");
    expect(byName.map((part) => part.name)).toEqual(["Oil Filter"]);

    const bySku = await PartDao.getAll("AF-200");
    expect(bySku.map((part) => part.name)).toEqual(["Air Filter"]);
  });
});
