import { describe, expect, it } from "vitest";

import { NotFoundError } from "@/server/useCases/errors";
import { maintenanceFactory } from "@/test/factories/maintenanceFactory";
import { updateMaintenanceUseCase } from "../updateMaintenanceUseCase";

describe("updateMaintenanceUseCase", () => {
  it("updates only the provided fields", async () => {
    const maintenance = await maintenanceFactory.create({
      status: "SCHEDULED",
      description: "Oil change",
    });

    const result = await updateMaintenanceUseCase(maintenance.id, {
      status: "COMPLETE",
    });

    expect(result.status).toBe("COMPLETE");
    expect(result.description).toBe("Oil change");
  });

  it("throws NotFoundError when the maintenance record does not exist", async () => {
    await expect(
      updateMaintenanceUseCase("does-not-exist", { status: "COMPLETE" }),
    ).rejects.toThrow(NotFoundError);
  });
});
