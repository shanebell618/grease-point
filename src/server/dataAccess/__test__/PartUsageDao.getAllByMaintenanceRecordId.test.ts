import { describe, expect, it } from "vitest";

import { PartUsageDao } from "../PartUsageDao";
import { maintenanceFactory } from "@/test/factories/maintenanceFactory";
import { partUsageFactory } from "@/test/factories/partUsageFactory";

describe("PartUsageDao.getAllByMaintenanceRecordId", () => {
  it("scopes results to the given maintenance record", async () => {
    const maintenance = await maintenanceFactory.create();
    await partUsageFactory.create({ maintenanceRecordId: maintenance.id });
    await partUsageFactory.create();

    const result = await PartUsageDao.getAllByMaintenanceRecordId(
      maintenance.id,
    );

    expect(result.length).toBe(1);
    expect(result[0]?.maintenanceRecordId).toBe(maintenance.id);
  });

  it("returns an empty array when nothing is attached", async () => {
    const maintenance = await maintenanceFactory.create();

    const result = await PartUsageDao.getAllByMaintenanceRecordId(
      maintenance.id,
    );

    expect(result).toEqual([]);
  });
});
