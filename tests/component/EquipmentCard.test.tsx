import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { EquipmentCard } from "@/features/equipment/components/EquipmentCard";

describe("EquipmentCard", () => {
  it("renders name, serial number, and engine hours", () => {
    render(
      <EquipmentCard
        equipment={{
          name: "CAT 320 Excavator",
          serialNumber: "CAT0320XJDR12345",
          status: "ACTIVE",
          engineHours: 4231.5,
        }}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "CAT 320 Excavator" }),
    ).toBeInTheDocument();
    expect(screen.getByText("S/N CAT0320XJDR12345")).toBeInTheDocument();
    expect(screen.getByText("4,231.5 hrs")).toBeInTheDocument();
  });

  it("shows the status label matching the given status", () => {
    render(
      <EquipmentCard
        equipment={{
          name: "Bobcat S650",
          serialNumber: "BC-S650-0042",
          status: "MAINTENANCE",
          engineHours: null,
        }}
      />,
    );

    expect(screen.getByText("Maintenance")).toBeInTheDocument();
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("renders as a link when href is provided", () => {
    render(
      <EquipmentCard
        equipment={{
          name: "John Deere 850L",
          serialNumber: "JD850L998877",
          status: "RETIRED",
          engineHours: 12034,
        }}
        href="/equipment/abc123"
      />,
    );

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/equipment/abc123",
    );
  });
});
