import { afterEach, describe, expect, it, vi } from "vitest";

import { deleteMaintenanceAction } from "../deleteMaintenanceAction";

const deleteMaintenanceUseCaseMock = vi.hoisted(() => vi.fn());

vi.mock("@/server/useCases/maintenance/deleteMaintenanceUseCase", () => ({
  deleteMaintenanceUseCase: deleteMaintenanceUseCaseMock,
}));

describe("deleteMaintenanceAction", () => {
  afterEach(() => {
    deleteMaintenanceUseCaseMock.mockReset();
  });

  it("calls the use case with the given id", async () => {
    await deleteMaintenanceAction("1");

    expect(deleteMaintenanceUseCaseMock).toHaveBeenCalledWith("1");
  });
});
