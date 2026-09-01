import { describe, expect, it } from "vitest";

import { createPartUseCase } from "../createPartUseCase";

describe("createPartUseCase", () => {
  it("persists a part with the given attributes", async () => {
    const result = await createPartUseCase({
      sku: "OF-100",
      name: "Oil Filter",
      quantityOnHand: 10,
      reorderThreshold: 2,
    });

    expect(result).toMatchObject({
      sku: "OF-100",
      name: "Oil Filter",
      quantityOnHand: 10,
      reorderThreshold: 2,
    });
  });
});
