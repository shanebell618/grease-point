import { describe, expect, it } from "vitest";

import { PartUsageDao } from "../PartUsageDao";
import { maintenanceFactory } from "@/test/factories/maintenanceFactory";
import { partUsageFactory } from "@/test/factories/partUsageFactory";

describe("PartUsageDao.deleteAllByMaintenanceRecordId", () => {
  it("removes every usage row for the given maintenance record", async () => {
    const maintenance = await maintenanceFactory.create();
    await partUsageFactory.create({ maintenanceRecordId: maintenance.id });
    await partUsageFactory.create({ maintenanceRecordId: maintenance.id });
    const otherMaintenance = await maintenanceFactory.create();
    await partUsageFactory.create({ maintenanceRecordId: otherMaintenance.id });

    await PartUsageDao.deleteAllByMaintenanceRecordId(maintenance.id);

    const remaining = await PartUsageDao.getAllByMaintenanceRecordId(
      maintenance.id,
    );
    expect(remaining).toEqual([]);

    const untouched = await PartUsageDao.getAllByMaintenanceRecordId(
      otherMaintenance.id,
    );
    expect(untouched.length).toBe(1);
  });
});
