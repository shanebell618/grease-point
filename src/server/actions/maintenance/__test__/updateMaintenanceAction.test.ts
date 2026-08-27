import { afterEach, describe, expect, it, vi } from "vitest";

import { updateMaintenanceAction } from "../updateMaintenanceAction";

const updateMaintenanceUseCaseMock = vi.hoisted(() => vi.fn());

vi.mock("@/server/useCases/maintenance/updateMaintenanceUseCase", () => ({
  updateMaintenanceUseCase: updateMaintenanceUseCaseMock,
}));

describe("updateMaintenanceAction", () => {
  afterEach(() => {
    updateMaintenanceUseCaseMock.mockReset();
  });

  it("validates partial input and calls the use case with the id", async () => {
    updateMaintenanceUseCaseMock.mockResolvedValue({
      id: "1",
      status: "COMPLETE",
    });

    const result = await updateMaintenanceAction("1", { status: "COMPLETE" });

    expect(updateMaintenanceUseCaseMock).toHaveBeenCalledWith(
      "1",
      expect.objectContaining({ status: "COMPLETE" }),
    );
    expect(result).toMatchObject({ id: "1" });
  });

  it("throws without calling the use case when input is invalid", async () => {
    await expect(
      updateMaintenanceAction("1", { status: "NOT_A_STATUS" }),
    ).rejects.toThrow();
    expect(updateMaintenanceUseCaseMock).not.toHaveBeenCalled();
  });
});
