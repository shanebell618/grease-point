import { describe, expect, it } from "vitest";
import { maintenanceFactory } from "@/test/factories/maintenanceFactory";
import { NotFoundError } from "@/server/useCases/errors";
import { MaintenanceDao } from "@/server/dataAccess/MaintenanceDao";

import { deleteMaintenanceUseCase } from "../deleteMaintenanceUseCase";

describe("deleteMaintenanceUseCase", () => {
  it("removes the maintenance record from the database", async () => {
    const maintenance = await maintenanceFactory.create();

    await deleteMaintenanceUseCase(maintenance.id);

    const found = await MaintenanceDao.getById(maintenance.id);
    expect(found).toBeNull();
  });

  it("throws NotFoundError when the maintenance record does not exist", async () => {
    await expect(deleteMaintenanceUseCase("does-not-exist")).rejects.toThrow(
      NotFoundError,
    );
  });
});
