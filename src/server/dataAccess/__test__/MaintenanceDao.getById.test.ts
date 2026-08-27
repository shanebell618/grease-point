import { describe, expect, it } from "vitest";

import { maintenanceFactory } from "@/test/factories/maintenanceFactory";
import { MaintenanceDao } from "../MaintenanceDao";

describe("MaintenanceDao.getById", () => {
  it("returns the matching maintenance record", async () => {
    const maintenance = await maintenanceFactory.create();

    const result = await MaintenanceDao.getById(maintenance.id);

    expect(result?.id).toBe(maintenance.id);
  });

  it("returns null when nothing matches", async () => {
    const result = await MaintenanceDao.getById("does-not-exist");
    expect(result).toBeNull();
  });
});
