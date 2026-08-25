-- RenameColumn
ALTER TABLE "MaintenanceRecord" RENAME COLUMN "performedAt" TO "serviceDate";

-- AddColumn
ALTER TABLE "MaintenanceRecord" ADD COLUMN "completedAt" DATETIME;
