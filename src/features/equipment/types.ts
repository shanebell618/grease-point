import type { EquipmentModel } from "@/generated/prisma/models";

// The shape as it actually arrives on the client: JSON has no Date type,
// so createdAt/updatedAt come back as ISO strings, not Date instances.
export type Equipment = Omit<EquipmentModel, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};
export type { EquipmentStatus } from "@/generated/prisma/enums";
