import { describe, expect, it } from "vitest";
import { equipmentFactory } from "@/test/factories/equipmentFactory";

import { getAllEquipmentByStatusUseCase } from "../getAllEquipmentByStatusUseCase";

describe("getAllEquipmentByStatusUseCase", () => {
  it("filters by the given status", async () => {
    await equipmentFactory.create({ status: "ACTIVE" });
    await equipmentFactory.create({ status: "MAINTENANCE" });

    const result = await getAllEquipmentByStatusUseCase("ACTIVE");

    expect(result).toHaveLength(1);
    expect(result[0].status).toBe("ACTIVE");
  });
});
