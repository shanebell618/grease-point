-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MaintenanceRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "equipmentId" TEXT NOT NULL,
    "performedAt" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'SCHEDULED',
    "cost" REAL,
    "nextDueHours" REAL,
    "nextDueDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MaintenanceRecord_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MaintenanceRecord" ("cost", "createdAt", "description", "equipmentId", "id", "nextDueDate", "nextDueHours", "performedAt") SELECT "cost", "createdAt", "description", "equipmentId", "id", "nextDueDate", "nextDueHours", "performedAt" FROM "MaintenanceRecord";
DROP TABLE "MaintenanceRecord";
ALTER TABLE "new_MaintenanceRecord" RENAME TO "MaintenanceRecord";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
