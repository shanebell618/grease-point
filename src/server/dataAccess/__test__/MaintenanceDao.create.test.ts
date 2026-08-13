import { describe, expect, it } from "vitest";

import { MaintenanceDao } from "../MaintenanceDao";
import { equipmentFactory } from "@/test/factories/equipmentFactory";

describe("MaintenanceDao.create", () => {
  it("persists a new maintenance record", async () => {
    const equipment = await equipmentFactory.create();

    const result = await MaintenanceDao.create({
      equipmentId: equipment.id,
      performedAt: new Date("2026-01-15"),
      description: "Replaced hydraulic hose",
      status: "COMPLETE",
    });

    expect(result.id).toBeDefined();
    expect(result.equipmentId).toBe(equipment.id);
    expect(result.description).toBe("Replaced hydraulic hose");

    const found = await MaintenanceDao.getById(result.id);
    expect(found).not.toBeNull();
  });

  it("defaults status to SCHEDULED when omitted", async () => {
    const equipment = await equipmentFactory.create();

    const result = await MaintenanceDao.create({
      equipmentId: equipment.id,
      performedAt: new Date("2026-02-01"),
      description: "Oil change due",
    });

    expect(result.status).toBe("SCHEDULED");
  });
});
