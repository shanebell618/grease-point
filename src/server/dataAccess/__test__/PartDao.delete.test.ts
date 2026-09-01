import { describe, expect, it } from "vitest";

import { PartDao } from "../PartDao";
import { partFactory } from "@/test/factories/partFactory";

describe("PartDao.delete", () => {
  it("removes the part row", async () => {
    const part = await partFactory.create();

    await PartDao.delete(part.id);

    const found = await PartDao.getById(part.id);
    expect(found).toBeNull();
  });
});
