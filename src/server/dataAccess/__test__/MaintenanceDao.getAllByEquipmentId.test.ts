import { describe, expect, it } from "vitest";

import { MaintenanceDao } from "../MaintenanceDao";
import { equipmentFactory } from "@/test/factories/equipmentFactory";
import { maintenanceFactory } from "@/test/factories/maintenanceFactory";

describe("MaintenanceDao.getAllByEquipmentId", () => {
  it("scopes results to the given equipmentId", async () => {
    const equipment = await equipmentFactory.create();
    await maintenanceFactory.create({ equipmentId: equipment.id });
    await maintenanceFactory.create();

    const result = await MaintenanceDao.getAllByEquipmentId(equipment.id);

    expect(result.length).toBe(1);
    expect(result[0]?.equipmentId).toBe(equipment.id);
  });

  it("orders results by serviceDate descending", async () => {
    const equipment = await equipmentFactory.create();
    await maintenanceFactory.create({
      equipmentId: equipment.id,
      serviceDate: new Date("2026-01-01"),
      description: "Older",
    });
    await maintenanceFactory.create({
      equipmentId: equipment.id,
      serviceDate: new Date("2026-03-01"),
      description: "Newer",
    });

    const result = await MaintenanceDao.getAllByEquipmentId(equipment.id);

    expect(result[0]?.description).toBe("Newer");
    expect(result[1]?.description).toBe("Older");
  });
});
