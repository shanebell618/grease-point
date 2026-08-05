import { describe, expect, it } from "vitest";

import { createEquipmentUseCase } from "../createEquipmentUseCase";

describe("createEquipmentUseCase", () => {
  it("persists equipment with the given attributes", async () => {
    const result = await createEquipmentUseCase({
      name: "CAT 320 Excavator",
      vin: "CAT0320XJDR12345",
      status: "ACTIVE",
    });

    expect(result).toMatchObject({
      name: "CAT 320 Excavator",
      vin: "CAT0320XJDR12345",
      status: "ACTIVE",
    });
  });

  it("stores empty optional strings as null", async () => {
    const result = await createEquipmentUseCase({
      name: "Bobcat S650",
      vin: "",
      status: "ACTIVE",
      photoUrl: "",
      notes: "",
    });

    expect(result.vin).toBeNull();
    expect(result.photoUrl).toBeNull();
    expect(result.notes).toBeNull();
  });
});
