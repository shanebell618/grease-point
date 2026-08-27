/*
  Warnings:

  - You are about to drop the column `serialNumber` on the `Equipment` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Equipment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "vin" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "purchasePrice" REAL,
    "engineHours" REAL,
    "photoUrl" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Equipment" ("createdAt", "engineHours", "id", "name", "notes", "photoUrl", "purchasePrice", "status", "updatedAt", "vin") SELECT "createdAt", "engineHours", "id", "name", "notes", "photoUrl", "purchasePrice", "status", "updatedAt", "vin" FROM "Equipment";
DROP TABLE "Equipment";
ALTER TABLE "new_Equipment" RENAME TO "Equipment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
