import { describe, expect, it } from "vitest";
import { partFactory } from "@/test/factories/partFactory";

import { getPartByIdUseCase } from "../getPartByIdUseCase";

describe("getPartByIdUseCase", () => {
  it("returns the part matching the given id", async () => {
    const part = await partFactory.create();

    const result = await getPartByIdUseCase(part.id);

    expect(result?.id).toBe(part.id);
  });

  it("returns null when no part matches", async () => {
    const result = await getPartByIdUseCase("does-not-exist");
    expect(result).toBeNull();
  });
});
