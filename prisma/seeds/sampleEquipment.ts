import { equipmentFactory } from "@/test/factories/equipmentFactory";

// Reuses the same factory the tests use, so seed data and test data stay
// built the same way — just with realistic overrides here instead of
// generic sequenced values.
export const createSampleEquipment = async () => {
  const catExcavator = await equipmentFactory.create({
    name: "CAT 320 Excavator",
    vin: "CAT0320XJDR12345",
    status: "ACTIVE",
    purchasePrice: 185000,
    operatingHours: 1240.5,
    notes: "Primary excavator for the north yard.",
  });

  const bobcatSkidSteer = await equipmentFactory.create({
    name: "Bobcat S650 Skid Steer",
    vin: null,
    status: "MAINTENANCE",
    purchasePrice: 52000,
    operatingHours: 890,
    notes: "In the shop for hydraulic hose replacement.",
  });

  const johnDeereDozer = await equipmentFactory.create({
    name: "John Deere 850K Dozer",
    vin: "JD850KX0099231",
    status: "ACTIVE",
    purchasePrice: 245000,
    operatingHours: 2310.25,
  });

  const kubotaMiniExcavator = await equipmentFactory.create({
    name: "Kubota KX080 Mini Excavator",
    vin: null,
    status: "RETIRED",
    purchasePrice: 68000,
    operatingHours: 4100,
    notes: "Sold at auction, kept for historical records.",
  });

  const jcbBackhoeLoader = await equipmentFactory.create({
    name: "JCB 3CX Backhoe Loader",
    vin: null,
    status: "OUT_OF_SERVICE",
    purchasePrice: 98000,
    operatingHours: 3025,
    notes: "Engine failure, awaiting parts.",
  });

  const caseBackhoe = await equipmentFactory.create({
    name: "Case 580 Super N Backhoe",
    vin: "CASE580SN00234",
    status: "ACTIVE",
    purchasePrice: 95000,
    operatingHours: 1560,
  });

  const volvoExcavator = await equipmentFactory.create({
    name: "Volvo EC220 Excavator",
    vin: "VOLVOEC220X7781",
    status: "ACTIVE",
    purchasePrice: 210000,
    operatingHours: 780.5,
  });

  const komatsuDozer = await equipmentFactory.create({
    name: "Komatsu D65 Dozer",
    vin: null,
    status: "MAINTENANCE",
    purchasePrice: 265000,
    operatingHours: 3400,
    notes: "Undercarriage service in progress.",
  });

  const newHollandTrackLoader = await equipmentFactory.create({
    name: "New Holland C238 Compact Track Loader",
    vin: "NHC238TL55210",
    status: "ACTIVE",
    purchasePrice: 72000,
    operatingHours: 610,
  });

  const genieScissorLift = await equipmentFactory.create({
    name: "Genie GS-1930 Scissor Lift",
    vin: null,
    status: "ACTIVE",
    purchasePrice: 18500,
    operatingHours: 340,
  });

  return {
    catExcavator,
    bobcatSkidSteer,
    johnDeereDozer,
    kubotaMiniExcavator,
    jcbBackhoeLoader,
    caseBackhoe,
    volvoExcavator,
    komatsuDozer,
    newHollandTrackLoader,
    genieScissorLift,
  };
};
