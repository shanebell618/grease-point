import { partFactory } from "@/test/factories/partFactory";

// Reuses the same factory the tests use, so seed data and test data stay
// built the same way — just with realistic overrides here instead of
// generic sequenced values.
export const createSampleParts = async () => {
  // Comfortably stocked
  await partFactory.create({
    sku: "OF-100",
    name: "Oil Filter",
    quantityOnHand: 24,
    reorderThreshold: 5,
    unitCost: 12.5,
  });

  await partFactory.create({
    sku: "AF-220",
    name: "Air Filter",
    quantityOnHand: 18,
    reorderThreshold: 4,
    unitCost: 24.0,
  });

  await partFactory.create({
    sku: "FF-330",
    name: "Fuel Filter",
    quantityOnHand: 15,
    reorderThreshold: 5,
    unitCost: 19.75,
  });

  await partFactory.create({
    sku: "HF-500",
    name: "Hydraulic Fluid (5 gal)",
    quantityOnHand: 12,
    reorderThreshold: 3,
    unitCost: 68.0,
  });

  await partFactory.create({
    sku: "BP-410",
    name: "Brake Pads (set)",
    quantityOnHand: 9,
    reorderThreshold: 4,
    unitCost: 145.0,
  });

  // At or below reorder threshold — shows up as "Low stock"
  await partFactory.create({
    sku: "HH-150",
    name: "Hydraulic Hose, 3/4in",
    quantityOnHand: 2,
    reorderThreshold: 3,
    unitCost: 54.25,
  });

  await partFactory.create({
    sku: "BT-600",
    name: "Bucket Teeth",
    quantityOnHand: 3,
    reorderThreshold: 6,
    unitCost: 32.0,
  });

  await partFactory.create({
    sku: "TB-720",
    name: "Track Bolts (box of 25)",
    quantityOnHand: 0,
    reorderThreshold: 2,
    unitCost: 41.5,
  });
};
