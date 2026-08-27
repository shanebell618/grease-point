import type { createSampleEquipment } from "./sampleEquipment";
import { maintenanceFactory } from "@/test/factories/maintenanceFactory";

type SampleEquipment = Awaited<ReturnType<typeof createSampleEquipment>>;

function daysFromNow(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

export const createSampleMaintenance = async (equipment: SampleEquipment) => {
  // Active work — machine is physically in the shop right now
  await maintenanceFactory.create({
    equipmentId: equipment.bobcatSkidSteer.id,
    serviceDate: daysFromNow(-2),
    description: "Replacing hydraulic hose",
    status: "IN_PROGRESS",
  });

  await maintenanceFactory.create({
    equipmentId: equipment.komatsuDozer.id,
    serviceDate: daysFromNow(-1),
    description: "Undercarriage inspection and track adjustment",
    status: "IN_PROGRESS",
  });

  await maintenanceFactory.create({
    equipmentId: equipment.jcbBackhoeLoader.id,
    serviceDate: daysFromNow(-5),
    description: "Engine rebuild — waiting on replacement parts",
    status: "WAITING_ON_PARTS",
  });

  // Upcoming — scheduled, soonest first once sorted
  await maintenanceFactory.create({
    equipmentId: equipment.catExcavator.id,
    serviceDate: daysFromNow(3),
    description: "500-hour service and fluid check",
    status: "SCHEDULED",
    cost: 450,
  });

  await maintenanceFactory.create({
    equipmentId: equipment.johnDeereDozer.id,
    serviceDate: daysFromNow(10),
    description: "Annual DOT inspection",
    status: "SCHEDULED",
  });

  await maintenanceFactory.create({
    equipmentId: equipment.volvoExcavator.id,
    serviceDate: daysFromNow(21),
    description: "Replace air filter and cabin filter",
    status: "SCHEDULED",
    nextDueHours: 1800,
  });

  await maintenanceFactory.create({
    equipmentId: equipment.newHollandTrackLoader.id,
    serviceDate: daysFromNow(45),
    description: "Tire rotation",
    status: "SCHEDULED",
  });

  // Recently completed — within the 7-day window, still shows on the
  // landing page
  await maintenanceFactory.create({
    equipmentId: equipment.genieScissorLift.id,
    serviceDate: daysFromNow(-3),
    description: "Battery replacement",
    status: "COMPLETE",
    completedAt: daysFromNow(-3),
    cost: 220,
  });

  await maintenanceFactory.create({
    equipmentId: equipment.caseBackhoe.id,
    serviceDate: daysFromNow(-6),
    description: "Oil and filter change",
    status: "COMPLETE",
    completedAt: daysFromNow(-6),
    cost: 180,
  });

  // Older completed — outside the 7-day window, drops off the landing
  // page but still shows in this equipment's full history
  await maintenanceFactory.create({
    equipmentId: equipment.kubotaMiniExcavator.id,
    serviceDate: daysFromNow(-45),
    description: "Replaced worn bucket teeth",
    status: "COMPLETE",
    completedAt: daysFromNow(-45),
    cost: 310,
  });

  await maintenanceFactory.create({
    equipmentId: equipment.catExcavator.id,
    serviceDate: daysFromNow(-60),
    description: "Hydraulic fluid flush",
    status: "COMPLETE",
    completedAt: daysFromNow(-60),
    cost: 275,
  });
};
