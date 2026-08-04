import { describe, expect, it } from "vitest";
import { equipmentFactory } from "@/test/factories/equipmentFactory";
import { NotFoundError } from "@/server/useCases/errors";

import { updateEquipmentUseCase } from "../updateEquipmentUseCase";

describe("updateEquipmentUseCase", () => {
  it("updates only the provided fields", async () => {
    const equipment = await equipmentFactory.create({
      status: "ACTIVE",
      engineHours: 10,
    });

    const result = await updateEquipmentUseCase(equipment.id, {
      status: "MAINTENANCE",
    });

    expect(result.status).toBe("MAINTENANCE");
    expect(result.engineHours).toBe(10);
  });

  it("converts empty optional strings to null", async () => {
    const equipment = await equipmentFactory.create({ vin: "ABC123" });

    const result = await updateEquipmentUseCase(equipment.id, { vin: "" });

    expect(result.vin).toBeNull();
  });

  it("throws NotFoundError when the equipment does not exist", async () => {
    await expect(
      updateEquipmentUseCase("does-not-exist", { status: "RETIRED" }),
    ).rejects.toThrow(NotFoundError);
  });
});
