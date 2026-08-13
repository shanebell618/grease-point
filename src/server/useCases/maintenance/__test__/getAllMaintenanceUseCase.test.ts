import { describe, expect, it } from "vitest";

import { maintenanceFactory } from "@/test/factories/maintenanceFactory";
import { getAllMaintenanceUseCase } from "../getAllMaintenanceUseCase";

describe("getAllMaintenanceUseCase", () => {
  it("returns all maintenance records", async () => {
    await maintenanceFactory.create();
    await maintenanceFactory.create();

    const result = await getAllMaintenanceUseCase();

    expect(result).toHaveLength(2);
  });

  it("returns an empty array when there are no maintenance records", async () => {
    const result = await getAllMaintenanceUseCase();
    expect(result).toEqual([]);
  });
});
