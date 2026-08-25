import { describe, expect, it } from "vitest";

import { createMaintenanceUseCase } from "../createMaintenanceUseCase";
import { equipmentFactory } from "@/test/factories/equipmentFactory";

describe("createMaintenanceUseCase", () => {
  it("persists a maintenance record with the given attributes", async () => {
    const equipment = await equipmentFactory.create();

    const result = await createMaintenanceUseCase({
      equipmentId: equipment.id,
      serviceDate: new Date("2026-01-15"),
      description: "Replaced hydraulic hose",
      status: "COMPLETE",
    });

    expect(result).toMatchObject({
      equipmentId: equipment.id,
      description: "Replaced hydraulic hose",
      status: "COMPLETE",
    });
    expect(result.completedAt).not.toBeNull();
  });
});
