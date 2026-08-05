import { prisma } from "@/lib/prisma";
import { createSampleEquipment } from "./seeds/sampleEquipment";

async function main() {
  await createSampleEquipment();
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
