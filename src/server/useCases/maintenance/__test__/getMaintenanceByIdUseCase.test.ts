import { describe, expect, it } from "vitest";

import { maintenanceFactory } from "@/test/factories/maintenanceFactory";
import { getMaintenanceByIdUseCase } from "../getMaintenanceByIdUseCase";

describe("getMaintenanceByIdUseCase", () => {
  it("returns the maintenance record matching the given id", async () => {
    const maintenance = await maintenanceFactory.create();

    const result = await getMaintenanceByIdUseCase(maintenance.id);

    expect(result?.id).toBe(maintenance.id);
  });

  it("returns null when no maintenance record matches", async () => {
    const result = await getMaintenanceByIdUseCase("does-not-exist");
    expect(result).toBeNull();
  });
});
