import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { EquipmentList } from "@/features/equipment/components/EquipmentList";
import * as equipmentApi from "@/features/equipment/api";
import { renderWithQueryClient } from "./test-utils";

vi.mock("@/features/equipment/api");

describe("EquipmentList", () => {
  it("shows a loading indicator while the query is pending", () => {
    vi.mocked(equipmentApi.fetchEquipmentList).mockReturnValue(
      new Promise(() => {}),
    );

    renderWithQueryClient(<EquipmentList />);

    expect(screen.getByLabelText("Loading equipment")).toBeInTheDocument();
  });

  it("shows an empty state when there is no equipment", async () => {
    vi.mocked(equipmentApi.fetchEquipmentList).mockResolvedValue([]);

    renderWithQueryClient(<EquipmentList />);

    expect(await screen.findByText(/No equipment yet/)).toBeInTheDocument();
  });

  it("renders a card for each piece of equipment", async () => {
    vi.mocked(equipmentApi.fetchEquipmentList).mockResolvedValue([
      {
        id: "1",
        name: "CAT 320 Excavator",
        serialNumber: "CAT0320XJDR12345",
        vin: null,
        status: "ACTIVE",
        purchasePrice: null,
        engineHours: 4231.5,
        photoUrl: null,
        notes: null,
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
      },
    ]);

    renderWithQueryClient(<EquipmentList />);

    expect(
      await screen.findByRole("heading", { name: "CAT 320 Excavator" }),
    ).toBeInTheDocument();
  });
});
