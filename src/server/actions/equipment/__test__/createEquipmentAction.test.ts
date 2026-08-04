import { afterEach, describe, expect, it, vi } from "vitest";

import { createEquipmentAction } from "../createEquipmentAction";

const createEquipmentUseCaseMock = vi.hoisted(() => vi.fn());

vi.mock("@/server/useCases/equipment/createEquipmentUseCase", () => ({
  createEquipmentUseCase: createEquipmentUseCaseMock,
}));

describe("createEquipmentAction", () => {
  afterEach(() => {
    createEquipmentUseCaseMock.mockReset();
  });

  it("validates input and calls the use case", async () => {
    const input = {
      name: "CAT 320 Excavator",
      serialNumber: "CAT0320XJDR12345",
      status: "ACTIVE",
    };
    createEquipmentUseCaseMock.mockResolvedValue({ id: "1", ...input });

    const result = await createEquipmentAction(input);

    expect(createEquipmentUseCaseMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: input.name,
        serialNumber: input.serialNumber,
      }),
    );
    expect(result).toMatchObject({ id: "1" });
  });

  it("throws without calling the use case when input is invalid", async () => {
    await expect(createEquipmentAction({ name: "" })).rejects.toThrow();
    expect(createEquipmentUseCaseMock).not.toHaveBeenCalled();
  });
});
