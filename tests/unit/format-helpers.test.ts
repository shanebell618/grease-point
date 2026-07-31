import { describe, expect, it } from "vitest";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";

describe("formatCurrency", () => {
  it("formats a number as whole-dollar USD", () => {
    expect(formatCurrency(185000)).toBe("$185,000");
  });

  it("returns an em dash for null or undefined", () => {
    expect(formatCurrency(null)).toBe("—");
    expect(formatCurrency(undefined)).toBe("—");
  });
});

describe("formatDate", () => {
  it("formats an ISO string as a short date", () => {
    // Noon UTC keeps this stable across CI/local timezones (UTC-11..UTC+12)
    // without landing on the previous/next local calendar day.
    expect(formatDate("2026-07-31T12:00:00.000Z")).toBe("Jul 31, 2026");
  });

  it("returns an em dash for null or undefined", () => {
    expect(formatDate(null)).toBe("—");
    expect(formatDate(undefined)).toBe("—");
  });
});
