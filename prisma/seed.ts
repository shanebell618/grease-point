import { createSampleEquipment } from "./seeds/sampleEquipment";
import { createSampleMaintenance } from "./seeds/sampleMaintenance";
import { createSampleParts } from "./seeds/sampleParts";
import { prisma } from "@/lib/prisma";

async function main() {
  const equipment = await createSampleEquipment();
  await createSampleMaintenance(equipment);
  await createSampleParts();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Seeding failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
