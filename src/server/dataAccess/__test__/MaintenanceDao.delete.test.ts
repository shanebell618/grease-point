import { describe, expect, it } from "vitest";

import { maintenanceFactory } from "@/test/factories/maintenanceFactory";
import { MaintenanceDao } from "../MaintenanceDao";

describe("MaintenanceDao.delete", () => {
  it("removes the maintenance record", async () => {
    const maintenance = await maintenanceFactory.create();

    await MaintenanceDao.delete(maintenance.id);

    const result = await MaintenanceDao.getById(maintenance.id);
    expect(result).toBeNull();
  });
});
