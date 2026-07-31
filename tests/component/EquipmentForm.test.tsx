import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EquipmentForm } from "@/features/equipment/components/EquipmentForm";

describe("EquipmentForm", () => {
  it("shows validation errors and does not submit when required fields are empty", async () => {
    const handleSubmit = vi.fn();
    render(
      <EquipmentForm onSubmit={handleSubmit} submitLabel="Create Equipment" />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Create Equipment" }));

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Serial number is required")).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit with the entered values when valid", async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();
    render(
      <EquipmentForm onSubmit={handleSubmit} submitLabel="Create Equipment" />,
    );

    await user.type(screen.getByLabelText(/Name/), "CAT 320 Excavator");
    await user.type(screen.getByLabelText(/Serial number/), "CAT0320XJDR12345");

    fireEvent.click(screen.getByRole("button", { name: "Create Equipment" }));

    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1));
    expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "CAT 320 Excavator",
        serialNumber: "CAT0320XJDR12345",
        status: "ACTIVE",
      }),
      expect.anything(),
    );
  });
});
