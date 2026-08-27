import { describe, expect, it } from "vitest";

import { maintenanceFactory } from "@/test/factories/maintenanceFactory";
import { MaintenanceDao } from "../MaintenanceDao";

describe("MaintenanceDao.getAll", () => {
  it("returns all maintenance records", async () => {
    await maintenanceFactory.create();
    await maintenanceFactory.create();

    const result = await MaintenanceDao.getAll();

    expect(result.length).toBe(2);
  });
});
