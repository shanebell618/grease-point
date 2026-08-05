import { equipmentFactory } from "@/test/factories/equipmentFactory";

// Reuses the same factory the tests use, so seed data and test data stay
// built the same way — just with realistic overrides here instead of
// generic sequenced values.
export const createSampleEquipment = async () => {
  await equipmentFactory.create({
    name: "CAT 320 Excavator",
    vin: "CAT0320XJDR12345",
    status: "ACTIVE",
    purchasePrice: 185000,
    operatingHours: 1240.5,
    notes: "Primary excavator for the north yard.",
  });

  await equipmentFactory.create({
    name: "Bobcat S650 Skid Steer",
    vin: null,
    status: "MAINTENANCE",
    purchasePrice: 52000,
    operatingHours: 890,
    notes: "In the shop for hydraulic hose replacement.",
  });

  await equipmentFactory.create({
    name: "John Deere 850K Dozer",
    vin: "JD850KX0099231",
    status: "ACTIVE",
    purchasePrice: 245000,
    operatingHours: 2310.25,
  });

  await equipmentFactory.create({
    name: "Kubota KX080 Mini Excavator",
    vin: null,
    status: "RETIRED",
    purchasePrice: 68000,
    operatingHours: 4100,
    notes: "Sold at auction, kept for historical records.",
  });

  await equipmentFactory.create({
    name: "JCB 3CX Backhoe Loader",
    vin: null,
    status: "OUT_OF_SERVICE",
    purchasePrice: 98000,
    operatingHours: 3025,
    notes: "Engine failure, awaiting parts.",
  });
};
