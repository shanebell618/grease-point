import { describe, expect, it } from "vitest";

import { PartDao } from "../PartDao";
import { partFactory } from "@/test/factories/partFactory";

describe("PartDao.getById", () => {
  it("returns the matching part", async () => {
    const part = await partFactory.create({ name: "Oil Filter" });

    const result = await PartDao.getById(part.id);

    expect(result?.name).toBe("Oil Filter");
  });

  it("returns null when no part matches", async () => {
    const result = await PartDao.getById("does-not-exist");

    expect(result).toBeNull();
  });
});
