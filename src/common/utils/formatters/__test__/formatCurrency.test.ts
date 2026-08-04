import { describe, expect, it } from "vitest";
import { formatCurrency } from "@/common/utils/formatters/formatCurrency";

describe("formatCurrency", () => {
  it("formats a number as whole-dollar USD", () => {
    expect(formatCurrency(185000)).toBe("$185,000");
  });

  it("returns an em dash for null or undefined", () => {
    expect(formatCurrency(null)).toBe("—");
    expect(formatCurrency(undefined)).toBe("—");
  });
});
