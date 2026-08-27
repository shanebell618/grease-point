import { describe, expect, it } from "vitest";

import { sortMaintenanceByPriority } from "@/verticals/maintenance/utils";

describe("sortMaintenanceByPriority", () => {
  it("puts active statuses before scheduled, and scheduled before complete", () => {
    const items = [
      {
        status: "COMPLETE" as const,
        serviceDate: "2026-01-01",
        completedAt: "2026-01-02",
      },
      {
        status: "SCHEDULED" as const,
        serviceDate: "2026-02-01",
        completedAt: null,
      },
      {
        status: "IN_PROGRESS" as const,
        serviceDate: "2026-01-15",
        completedAt: null,
      },
    ];

    const result = sortMaintenanceByPriority(items);

    expect(result.map((item) => item.status)).toEqual([
      "IN_PROGRESS",
      "SCHEDULED",
      "COMPLETE",
    ]);
  });

  it("orders active items oldest service date first", () => {
    const items = [
      {
        status: "WAITING_ON_PARTS" as const,
        serviceDate: "2026-03-01",
        completedAt: null,
      },
      {
        status: "IN_PROGRESS" as const,
        serviceDate: "2026-01-01",
        completedAt: null,
      },
    ];

    const result = sortMaintenanceByPriority(items);

    expect(result.map((item) => item.serviceDate)).toEqual([
      "2026-01-01",
      "2026-03-01",
    ]);
  });

  it("orders scheduled items soonest service date first", () => {
    const items = [
      {
        status: "SCHEDULED" as const,
        serviceDate: "2026-05-01",
        completedAt: null,
      },
      {
        status: "SCHEDULED" as const,
        serviceDate: "2026-04-01",
        completedAt: null,
      },
    ];

    const result = sortMaintenanceByPriority(items);

    expect(result.map((item) => item.serviceDate)).toEqual([
      "2026-04-01",
      "2026-05-01",
    ]);
  });

  it("orders completed items most recently completed first", () => {
    const items = [
      {
        status: "COMPLETE" as const,
        serviceDate: "2026-01-01",
        completedAt: "2026-01-05",
      },
      {
        status: "COMPLETE" as const,
        serviceDate: "2026-01-01",
        completedAt: "2026-01-10",
      },
    ];

    const result = sortMaintenanceByPriority(items);

    expect(result.map((item) => item.completedAt)).toEqual([
      "2026-01-10",
      "2026-01-05",
    ]);
  });

  it("does not mutate the input array", () => {
    const items = [
      {
        status: "COMPLETE" as const,
        serviceDate: "2026-01-01",
        completedAt: "2026-01-02",
      },
      {
        status: "SCHEDULED" as const,
        serviceDate: "2026-02-01",
        completedAt: null,
      },
    ];
    const original = [...items];

    sortMaintenanceByPriority(items);

    expect(items).toEqual(original);
  });
});
