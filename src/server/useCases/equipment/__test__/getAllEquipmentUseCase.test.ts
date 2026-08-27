import { describe, expect, it } from "vitest";
import { equipmentFactory } from "@/test/factories/equipmentFactory";

import { getAllEquipmentUseCase } from "../getAllEquipmentUseCase";

describe("getAllEquipmentUseCase", () => {
  it("returns all equipment", async () => {
    await equipmentFactory.create({ status: "ACTIVE" });
    await equipmentFactory.create({ status: "MAINTENANCE" });

    const result = await getAllEquipmentUseCase();

    expect(result).toHaveLength(2);
  });

  it("returns an empty array when there is no equipment", async () => {
    const result = await getAllEquipmentUseCase();
    expect(result).toEqual([]);
  });
});
