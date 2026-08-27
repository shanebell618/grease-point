import { describe, expect, it } from "vitest";

import { getAllActiveOrRecentlyCompletedMaintenanceUseCase } from "../getAllActiveOrRecentlyCompletedMaintenanceUseCase";
import { maintenanceFactory } from "@/test/factories/maintenanceFactory";

describe("getAllActiveOrRecentlyCompletedMaintenanceUseCase", () => {
  it("includes non-complete records regardless of age", async () => {
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 30);

    await maintenanceFactory.create({
      status: "SCHEDULED",
      serviceDate: oldDate,
    });

    const result = await getAllActiveOrRecentlyCompletedMaintenanceUseCase();

    expect(result).toHaveLength(1);
  });

  it("includes completed records finished within the last 7 days", async () => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    await maintenanceFactory.create({
      status: "COMPLETE",
      completedAt: threeDaysAgo,
    });

    const result = await getAllActiveOrRecentlyCompletedMaintenanceUseCase();

    expect(result).toHaveLength(1);
  });

  it("excludes completed records finished more than 7 days ago", async () => {
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    await maintenanceFactory.create({
      status: "COMPLETE",
      completedAt: twoWeeksAgo,
    });

    const result = await getAllActiveOrRecentlyCompletedMaintenanceUseCase();

    expect(result).toEqual([]);
  });
});
