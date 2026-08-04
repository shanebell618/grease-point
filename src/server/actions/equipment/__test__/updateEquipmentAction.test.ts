import { afterEach, describe, expect, it, vi } from "vitest";

import { updateEquipmentAction } from "../updateEquipmentAction";

const updateEquipmentUseCaseMock = vi.hoisted(() => vi.fn());

vi.mock("@/server/useCases/equipment/updateEquipmentUseCase", () => ({
  updateEquipmentUseCase: updateEquipmentUseCaseMock,
}));

describe("updateEquipmentAction", () => {
  afterEach(() => {
    updateEquipmentUseCaseMock.mockReset();
  });

  it("validates partial input and calls the use case with the id", async () => {
    updateEquipmentUseCaseMock.mockResolvedValue({
      id: "1",
      status: "MAINTENANCE",
    });

    const result = await updateEquipmentAction("1", { status: "MAINTENANCE" });

    expect(updateEquipmentUseCaseMock).toHaveBeenCalledWith(
      "1",
      expect.objectContaining({ status: "MAINTENANCE" }),
    );
    expect(result).toMatchObject({ id: "1" });
  });

  it("throws without calling the use case when input is invalid", async () => {
    await expect(
      updateEquipmentAction("1", { status: "NOT_A_STATUS" }),
    ).rejects.toThrow();
    expect(updateEquipmentUseCaseMock).not.toHaveBeenCalled();
  });
});
