import { afterEach, describe, expect, it, vi } from "vitest";

import { createMaintenanceAction } from "../createMaintenanceAction";

const createMaintenanceUseCaseMock = vi.hoisted(() => vi.fn());

vi.mock("@/server/useCases/maintenance/createMaintenanceUseCase", () => ({
  createMaintenanceUseCase: createMaintenanceUseCaseMock,
}));

describe("createMaintenanceAction", () => {
  afterEach(() => {
    createMaintenanceUseCaseMock.mockReset();
  });

  it("validates input and calls the use case", async () => {
    const input = {
      equipmentId: "some-equipment-id",
      serviceDate: "2026-01-15",
      description: "Replaced hydraulic hose",
      status: "COMPLETE",
    };
    createMaintenanceUseCaseMock.mockResolvedValue({ id: "1", ...input });

    const result = await createMaintenanceAction(input);

    expect(createMaintenanceUseCaseMock).toHaveBeenCalledWith(
      expect.objectContaining({
        equipmentId: input.equipmentId,
        description: input.description,
      }),
    );
    expect(result).toMatchObject({ id: "1" });
  });

  it("throws without calling the use case when input is invalid", async () => {
    await expect(
      createMaintenanceAction({ description: "" }),
    ).rejects.toThrow();
    expect(createMaintenanceUseCaseMock).not.toHaveBeenCalled();
  });
});
