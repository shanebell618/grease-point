import { describe, expect, it } from "vitest";

import { MaintenanceDao } from "../MaintenanceDao";
import { maintenanceFactory } from "@/test/factories/maintenanceFactory";
import { partUsageFactory } from "@/test/factories/partUsageFactory";

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

  it("includes the record's part usage", async () => {
    const maintenance = await maintenanceFactory.create();
    const partUsage = await partUsageFactory.create({
      maintenanceRecordId: maintenance.id,
      quantityUsed: 3,
    });

    const result = await MaintenanceDao.getById(maintenance.id);

    expect(result?.partUsages).toHaveLength(1);
    expect(result?.partUsages[0]).toMatchObject({
      partId: partUsage.partId,
      quantityUsed: 3,
    });
  });
});
