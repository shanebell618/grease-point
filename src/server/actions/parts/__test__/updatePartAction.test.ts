import { afterEach, describe, expect, it, vi } from "vitest";

import { updatePartAction } from "../updatePartAction";

const updatePartUseCaseMock = vi.hoisted(() => vi.fn());

vi.mock("@/server/useCases/parts/updatePartUseCase", () => ({
  updatePartUseCase: updatePartUseCaseMock,
}));

describe("updatePartAction", () => {
  afterEach(() => {
    updatePartUseCaseMock.mockReset();
  });

  it("validates partial input and calls the use case with the id", async () => {
    updatePartUseCaseMock.mockResolvedValue({ id: "1", quantityOnHand: 5 });

    const result = await updatePartAction("1", { quantityOnHand: 5 });

    expect(updatePartUseCaseMock).toHaveBeenCalledWith(
      "1",
      expect.objectContaining({ quantityOnHand: 5 }),
    );
    expect(result).toMatchObject({ id: "1" });
  });

  it("throws without calling the use case when input is invalid", async () => {
    await expect(
      updatePartAction("1", { quantityOnHand: -5 }),
    ).rejects.toThrow();
    expect(updatePartUseCaseMock).not.toHaveBeenCalled();
  });
});
