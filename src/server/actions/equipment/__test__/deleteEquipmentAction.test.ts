import { afterEach, describe, expect, it, vi } from "vitest";

import { deleteEquipmentAction } from "../deleteEquipmentAction";

const deleteEquipmentUseCaseMock = vi.hoisted(() => vi.fn());

vi.mock("@/server/useCases/equipment/deleteEquipmentUseCase", () => ({
  deleteEquipmentUseCase: deleteEquipmentUseCaseMock,
}));

describe("deleteEquipmentAction", () => {
  afterEach(() => {
    deleteEquipmentUseCaseMock.mockReset();
  });

  it("calls the use case with the given id", async () => {
    await deleteEquipmentAction("1");

    expect(deleteEquipmentUseCaseMock).toHaveBeenCalledWith("1");
  });
});
