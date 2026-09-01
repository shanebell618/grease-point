import { describe, expect, it } from "vitest";

import { NotFoundError } from "@/server/useCases/errors";
import { partFactory } from "@/test/factories/partFactory";
import { updatePartUseCase } from "../updatePartUseCase";

describe("updatePartUseCase", () => {
  it("updates only the provided fields", async () => {
    const part = await partFactory.create({
      name: "Oil Filter",
      quantityOnHand: 10,
    });

    const result = await updatePartUseCase(part.id, { quantityOnHand: 8 });

    expect(result.quantityOnHand).toBe(8);
    expect(result.name).toBe("Oil Filter");
  });

  it("throws NotFoundError when the part does not exist", async () => {
    await expect(
      updatePartUseCase("does-not-exist", { quantityOnHand: 5 }),
    ).rejects.toThrow(NotFoundError);
  });
});
