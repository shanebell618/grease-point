import { InsufficientStockError, NotFoundError } from "../errors";

import { PartDao } from "@/server/dataAccess/PartDao";
import { PartUsageDao } from "@/server/dataAccess/PartUsageDao";

interface PartUsageTarget {
  partId: string;
  quantityUsed: number;
}

// Makes the parts actually attached to a maintenance record match
// `target`, adjusting each part's quantityOnHand by however much usage
// changed. Must run inside withTransaction() — it reads and writes
// several rows that all need to succeed or fail together.
export const reconcilePartUsageUseCase = async (
  maintenanceRecordId: string,
  target: PartUsageTarget[],
) => {
  const existing =
    await PartUsageDao.getAllByMaintenanceRecordId(maintenanceRecordId);
  const existingByPartId = new Map(
    existing.map((usage) => [usage.partId, usage.quantityUsed]),
  );

  // Sum, in case the same part appears more than once in target.
  const targetByPartId = new Map<string, number>();
  for (const usage of target) {
    const quantitySoFar = targetByPartId.get(usage.partId) ?? 0;
    targetByPartId.set(usage.partId, quantitySoFar + usage.quantityUsed);
  }

  const allPartIds = new Set([
    ...existingByPartId.keys(),
    ...targetByPartId.keys(),
  ]);

  // How much more (positive) or less (negative) of this part is being
  // used than before.
  const getDelta = (partId: string) => {
    const targetQuantity = targetByPartId.get(partId) ?? 0;
    const existingQuantity = existingByPartId.get(partId) ?? 0;
    return targetQuantity - existingQuantity;
  };

  // Validate everything before writing anything — one part running out
  // should fail the whole reconciliation, not partially apply.
  for (const partId of allPartIds) {
    const delta = getDelta(partId);
    const isUsingMoreThanBefore = delta > 0;
    if (!isUsingMoreThanBefore) continue;

    const part = await PartDao.getById(partId);
    if (!part) throw new NotFoundError("Part");

    const notEnoughInStock = part.quantityOnHand < delta;
    if (notEnoughInStock) {
      throw new InsufficientStockError(part.name, part.quantityOnHand, delta);
    }
  }

  for (const partId of allPartIds) {
    const delta = getDelta(partId);
    const quantityIsUnchanged = delta === 0;
    if (quantityIsUnchanged) continue;

    // delta > 0 (using more) subtracts stock; delta < 0 (using less,
    // or removed) subtracts a negative number, which adds it back.
    await PartDao.update(partId, { quantityOnHand: { decrement: delta } });
  }

  if (existing.length > 0) {
    await PartUsageDao.deleteAllByMaintenanceRecordId(maintenanceRecordId);
  }

  const rowsToCreate: {
    partId: string;
    maintenanceRecordId: string;
    quantityUsed: number;
  }[] = [];
  for (const [partId, quantityUsed] of targetByPartId.entries()) {
    if (quantityUsed <= 0) continue;
    rowsToCreate.push({ partId, maintenanceRecordId, quantityUsed });
  }

  if (rowsToCreate.length > 0) {
    await PartUsageDao.createMany(rowsToCreate);
  }
};
