import { describe, expect, it } from "vitest";

import { PartUsageDao } from "../PartUsageDao";
import { maintenanceFactory } from "@/test/factories/maintenanceFactory";
import { partFactory } from "@/test/factories/partFactory";

describe("PartUsageDao.createMany", () => {
  it("persists multiple part usage rows", async () => {
    const maintenance = await maintenanceFactory.create();
    const partA = await partFactory.create();
    const partB = await partFactory.create();

    await PartUsageDao.createMany([
      {
        partId: partA.id,
        maintenanceRecordId: maintenance.id,
        quantityUsed: 2,
      },
      {
        partId: partB.id,
        maintenanceRecordId: maintenance.id,
        quantityUsed: 1,
      },
    ]);

    const result = await PartUsageDao.getAllByMaintenanceRecordId(
      maintenance.id,
    );
    expect(result.length).toBe(2);
  });
});
