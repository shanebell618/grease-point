import { describe, expect, it } from "vitest";

import { maintenanceFactory } from "@/test/factories/maintenanceFactory";
import { MaintenanceDao } from "../MaintenanceDao";

describe("MaintenanceDao.update", () => {
  it("updates the given fields", async () => {
    const maintenance = await maintenanceFactory.create({
      status: "SCHEDULED",
    });

    const result = await MaintenanceDao.update(maintenance.id, {
      status: "COMPLETE",
    });

    expect(result.status).toBe("COMPLETE");
  });
});
