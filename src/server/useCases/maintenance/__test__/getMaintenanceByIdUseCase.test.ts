import { describe, expect, it } from "vitest";

import { getMaintenanceByIdUseCase } from "../getMaintenanceByIdUseCase";
import { maintenanceFactory } from "@/test/factories/maintenanceFactory";
import { partUsageFactory } from "@/test/factories/partUsageFactory";

describe("getMaintenanceByIdUseCase", () => {
  it("returns the maintenance record matching the given id", async () => {
    const maintenance = await maintenanceFactory.create();

    const result = await getMaintenanceByIdUseCase(maintenance.id);

    expect(result?.id).toBe(maintenance.id);
  });

  it("returns null when no maintenance record matches", async () => {
    const result = await getMaintenanceByIdUseCase("does-not-exist");
    expect(result).toBeNull();
  });

  it("reshapes part usage into partsUsed", async () => {
    const maintenance = await maintenanceFactory.create();
    const partUsage = await partUsageFactory.create({
      maintenanceRecordId: maintenance.id,
      quantityUsed: 2,
    });

    const result = await getMaintenanceByIdUseCase(maintenance.id);

    expect(result?.partsUsed).toEqual([
      { partId: partUsage.partId, quantityUsed: 2 },
    ]);
    expect(result).not.toHaveProperty("partUsages");
  });
});
