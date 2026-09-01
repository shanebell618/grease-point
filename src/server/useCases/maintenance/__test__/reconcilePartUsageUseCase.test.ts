import { describe, expect, it } from "vitest";

import { InsufficientStockError } from "../../errors";
import { PartDao } from "@/server/dataAccess/PartDao";
import { PartUsageDao } from "@/server/dataAccess/PartUsageDao";
import { maintenanceFactory } from "@/test/factories/maintenanceFactory";
import { partFactory } from "@/test/factories/partFactory";
import { partUsageFactory } from "@/test/factories/partUsageFactory";
import { reconcilePartUsageUseCase } from "../reconcilePartUsageUseCase";

describe("reconcilePartUsageUseCase", () => {
  it("decrements stock and creates usage rows when parts are used for the first time", async () => {
    const maintenance = await maintenanceFactory.create();
    const part = await partFactory.create({ quantityOnHand: 10 });

    await reconcilePartUsageUseCase(maintenance.id, [
      { partId: part.id, quantityUsed: 3 },
    ]);

    const updatedPart = await PartDao.getById(part.id);
    expect(updatedPart?.quantityOnHand).toBe(7);

    const usages = await PartUsageDao.getAllByMaintenanceRecordId(
      maintenance.id,
    );
    expect(usages).toHaveLength(1);
    expect(usages[0]?.quantityUsed).toBe(3);
  });

  it("only decrements by the difference when usage increases on an existing part", async () => {
    const maintenance = await maintenanceFactory.create();
    const part = await partFactory.create({ quantityOnHand: 8 });
    await partUsageFactory.create({
      maintenanceRecordId: maintenance.id,
      partId: part.id,
      quantityUsed: 2,
    });

    await reconcilePartUsageUseCase(maintenance.id, [
      { partId: part.id, quantityUsed: 5 },
    ]);

    const updatedPart = await PartDao.getById(part.id);
    // 8 currently on hand, 2 already used on this job. Now using 5
    // total — 3 more than before — so 3 more comes off: 8 - 3 = 5.
    expect(updatedPart?.quantityOnHand).toBe(5);
  });

  it("restores stock when usage decreases on an existing part", async () => {
    const maintenance = await maintenanceFactory.create();
    const part = await partFactory.create({ quantityOnHand: 5 });
    await partUsageFactory.create({
      maintenanceRecordId: maintenance.id,
      partId: part.id,
      quantityUsed: 5,
    });

    await reconcilePartUsageUseCase(maintenance.id, [
      { partId: part.id, quantityUsed: 2 },
    ]);

    const updatedPart = await PartDao.getById(part.id);
    expect(updatedPart?.quantityOnHand).toBe(8);
  });

  it("restores stock and removes the row entirely when a part is dropped", async () => {
    const maintenance = await maintenanceFactory.create();
    const part = await partFactory.create({ quantityOnHand: 5 });
    await partUsageFactory.create({
      maintenanceRecordId: maintenance.id,
      partId: part.id,
      quantityUsed: 3,
    });

    await reconcilePartUsageUseCase(maintenance.id, []);

    const updatedPart = await PartDao.getById(part.id);
    expect(updatedPart?.quantityOnHand).toBe(8);

    const usages = await PartUsageDao.getAllByMaintenanceRecordId(
      maintenance.id,
    );
    expect(usages).toHaveLength(0);
  });

  it("throws InsufficientStockError and changes nothing when there isn't enough stock", async () => {
    const maintenance = await maintenanceFactory.create();
    const part = await partFactory.create({
      name: "Oil Filter",
      quantityOnHand: 2,
    });

    await expect(
      reconcilePartUsageUseCase(maintenance.id, [
        { partId: part.id, quantityUsed: 5 },
      ]),
    ).rejects.toThrow(InsufficientStockError);

    const unchangedPart = await PartDao.getById(part.id);
    expect(unchangedPart?.quantityOnHand).toBe(2);

    const usages = await PartUsageDao.getAllByMaintenanceRecordId(
      maintenance.id,
    );
    expect(usages).toHaveLength(0);
  });

  it("sums quantities when the same part appears more than once in target", async () => {
    const maintenance = await maintenanceFactory.create();
    const part = await partFactory.create({ quantityOnHand: 10 });

    await reconcilePartUsageUseCase(maintenance.id, [
      { partId: part.id, quantityUsed: 2 },
      { partId: part.id, quantityUsed: 3 },
    ]);

    const updatedPart = await PartDao.getById(part.id);
    expect(updatedPart?.quantityOnHand).toBe(5);

    const usages = await PartUsageDao.getAllByMaintenanceRecordId(
      maintenance.id,
    );
    expect(usages).toHaveLength(1);
    expect(usages[0]?.quantityUsed).toBe(5);
  });

  it("does nothing when target is empty and nothing was attached before", async () => {
    const maintenance = await maintenanceFactory.create();

    await reconcilePartUsageUseCase(maintenance.id, []);

    const usages = await PartUsageDao.getAllByMaintenanceRecordId(
      maintenance.id,
    );
    expect(usages).toHaveLength(0);
  });
});
