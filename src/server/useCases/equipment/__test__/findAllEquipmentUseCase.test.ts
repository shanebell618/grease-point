import { describe, expect, it } from "vitest";
import { equipmentFactory } from "@/test/factories/equipmentFactory";

import { findAllEquipmentUseCase } from "../findAllEquipmentUseCase";

describe("findAllEquipmentUseCase", () => {
  it("returns all equipment when no status filter is given", async () => {
    await equipmentFactory.create({ status: "ACTIVE" });
    await equipmentFactory.create({ status: "MAINTENANCE" });

    const result = await findAllEquipmentUseCase();

    expect(result).toHaveLength(2);
  });

  it("filters by status when provided", async () => {
    await equipmentFactory.create({ status: "ACTIVE" });
    await equipmentFactory.create({ status: "MAINTENANCE" });

    const result = await findAllEquipmentUseCase("ACTIVE");

    expect(result).toHaveLength(1);
    expect(result[0].status).toBe("ACTIVE");
  });

  it("returns an empty array when there is no equipment", async () => {
    const result = await findAllEquipmentUseCase();
    expect(result).toEqual([]);
  });
});
