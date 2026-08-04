import { describe, expect, it } from "vitest";
import { equipmentFactory } from "@/test/factories/equipmentFactory";

import { getEquipmentByIdUseCase } from "../getEquipmentByIdUseCase";

describe("getEquipmentByIdUseCase", () => {
  it("returns the equipment matching the given id", async () => {
    const equipment = await equipmentFactory.create();

    const result = await getEquipmentByIdUseCase(equipment.id);

    expect(result?.id).toBe(equipment.id);
  });

  it("returns null when no equipment matches", async () => {
    const result = await getEquipmentByIdUseCase("does-not-exist");
    expect(result).toBeNull();
  });
});
