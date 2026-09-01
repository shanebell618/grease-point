import { describe, expect, it } from "vitest";
import { partFactory } from "@/test/factories/partFactory";
import { NotFoundError } from "@/server/useCases/errors";
import { PartDao } from "@/server/dataAccess/PartDao";

import { deletePartUseCase } from "../deletePartUseCase";

describe("deletePartUseCase", () => {
  it("removes the part from the database", async () => {
    const part = await partFactory.create();

    await deletePartUseCase(part.id);

    const found = await PartDao.getById(part.id);
    expect(found).toBeNull();
  });

  it("throws NotFoundError when the part does not exist", async () => {
    await expect(deletePartUseCase("does-not-exist")).rejects.toThrow(
      NotFoundError,
    );
  });
});
