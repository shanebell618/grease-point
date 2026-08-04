import type { Equipment, EquipmentStatus } from "./types";

import type { CreateEquipmentInput } from "@/server/schemas/equipment/createEquipmentInputSchema";

async function parseOrThrow<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(
      body?.error ? JSON.stringify(body.error) : response.statusText,
    );
  }
  return response.json();
}

export async function fetchEquipmentList(
  status?: EquipmentStatus,
): Promise<Equipment[]> {
  const url = status ? `/api/equipment?status=${status}` : "/api/equipment";
  const response = await fetch(url);
  return parseOrThrow<Equipment[]>(response);
}

export async function fetchEquipmentById(id: string): Promise<Equipment> {
  const response = await fetch(`/api/equipment/${id}`);
  return parseOrThrow<Equipment>(response);
}

export async function createEquipment(
  input: CreateEquipmentInput,
): Promise<Equipment> {
  const response = await fetch("/api/equipment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return parseOrThrow<Equipment>(response);
}

export async function updateEquipment(
  id: string,
  input: Partial<CreateEquipmentInput>,
): Promise<Equipment> {
  const response = await fetch(`/api/equipment/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return parseOrThrow<Equipment>(response);
}

export async function deleteEquipment(id: string): Promise<void> {
  const response = await fetch(`/api/equipment/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Failed to delete equipment");
  }
}
