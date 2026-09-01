import { afterEach, describe, expect, it, vi } from "vitest";

import { createPartAction } from "../createPartAction";

const createPartUseCaseMock = vi.hoisted(() => vi.fn());

vi.mock("@/server/useCases/parts/createPartUseCase", () => ({
  createPartUseCase: createPartUseCaseMock,
}));

describe("createPartAction", () => {
  afterEach(() => {
    createPartUseCaseMock.mockReset();
  });

  it("validates input and calls the use case", async () => {
    const input = {
      sku: "OF-100",
      name: "Oil Filter",
      quantityOnHand: 10,
      reorderThreshold: 2,
    };
    createPartUseCaseMock.mockResolvedValue({ id: "1", ...input });

    const result = await createPartAction(input);

    expect(createPartUseCaseMock).toHaveBeenCalledWith(
      expect.objectContaining({ sku: input.sku, name: input.name }),
    );
    expect(result).toMatchObject({ id: "1" });
  });

  it("throws without calling the use case when input is invalid", async () => {
    await expect(createPartAction({ name: "" })).rejects.toThrow();
    expect(createPartUseCaseMock).not.toHaveBeenCalled();
  });
});
