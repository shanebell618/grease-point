import { describe, expect, it } from "vitest";
import {
  filterEquipmentByStatus,
  formatOperatingHours,
  sortEquipmentByName,
} from "@/verticals/equipment/utils";

describe("sortEquipmentByName", () => {
  const items = [
    { name: "Skid Steer" },
    { name: "Excavator" },
    { name: "Dozer" },
  ];

  it("sorts ascending by default", () => {
    expect(sortEquipmentByName(items).map((i) => i.name)).toEqual([
      "Dozer",
      "Excavator",
      "Skid Steer",
    ]);
  });

  it("sorts descending when requested", () => {
    expect(sortEquipmentByName(items, "desc").map((i) => i.name)).toEqual([
      "Skid Steer",
      "Excavator",
      "Dozer",
    ]);
  });

  it("does not mutate the input array", () => {
    const original = [...items];
    sortEquipmentByName(items);
    expect(items).toEqual(original);
  });
});

describe("filterEquipmentByStatus", () => {
  const items = [
    { status: "ACTIVE" as const },
    { status: "MAINTENANCE" as const },
    { status: "ACTIVE" as const },
  ];

  it("returns only items matching the given status", () => {
    expect(filterEquipmentByStatus(items, "ACTIVE")).toHaveLength(2);
  });

  it("returns all items when status is ALL", () => {
    expect(filterEquipmentByStatus(items, "ALL")).toHaveLength(3);
  });

  it("returns an empty array when nothing matches", () => {
    expect(filterEquipmentByStatus(items, "RETIRED")).toEqual([]);
  });
});

describe("formatOperatingHours", () => {
  it("formats a number with the hrs suffix", () => {
    expect(formatOperatingHours(4231.5)).toBe("4,231.5 hrs");
  });

  it("returns an em dash for null or undefined", () => {
    expect(formatOperatingHours(null)).toBe("—");
    expect(formatOperatingHours(undefined)).toBe("—");
  });

  it("rounds to at most one decimal place", () => {
    expect(formatOperatingHours(100.256)).toBe("100.3 hrs");
  });
});
