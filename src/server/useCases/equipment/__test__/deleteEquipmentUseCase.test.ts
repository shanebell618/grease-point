import { describe, expect, it } from "vitest";
import { equipmentFactory } from "@/test/factories/equipmentFactory";
import { NotFoundError } from "@/server/useCases/errors";
import { EquipmentDao } from "@/server/dataAccess/EquipmentDao";

import { deleteEquipmentUseCase } from "../deleteEquipmentUseCase";

describe("deleteEquipmentUseCase", () => {
  it("removes the equipment from the database", async () => {
    const equipment = await equipmentFactory.create();

    await deleteEquipmentUseCase(equipment.id);

    const found = await EquipmentDao.getById(equipment.id);
    expect(found).toBeNull();
  });

  it("throws NotFoundError when the equipment does not exist", async () => {
    await expect(deleteEquipmentUseCase("does-not-exist")).rejects.toThrow(
      NotFoundError,
    );
  });
});
