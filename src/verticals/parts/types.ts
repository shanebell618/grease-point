import type { PartModel } from "@/generated/prisma/models";

// The shape as it actually arrives on the client: JSON has no Date type,
// so createdAt/updatedAt come back as ISO strings, not Date instances.
export type Part = Omit<PartModel, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};
