import type { CreateMaintenanceInput } from "@/server/schemas/maintenance/createMaintenanceInputSchema";
import type { Maintenance } from "./types";

async function parseOrThrow<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(
      body?.error ? JSON.stringify(body.error) : response.statusText,
    );
  }
  return response.json();
}

export async function fetchMaintenanceList(
  equipmentId?: string,
): Promise<Maintenance[]> {
  const url = equipmentId
    ? `/api/maintenance?equipmentId=${equipmentId}`
    : "/api/maintenance";
  const response = await fetch(url);
  return parseOrThrow<Maintenance[]>(response);
}

export async function fetchMaintenanceById(id: string): Promise<Maintenance> {
  const response = await fetch(`/api/maintenance/${id}`);
  return parseOrThrow<Maintenance>(response);
}

export async function createMaintenance(
  input: CreateMaintenanceInput,
): Promise<Maintenance> {
  const response = await fetch("/api/maintenance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return parseOrThrow<Maintenance>(response);
}

export async function updateMaintenance(
  id: string,
  input: Partial<CreateMaintenanceInput>,
): Promise<Maintenance> {
  const response = await fetch(`/api/maintenance/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return parseOrThrow<Maintenance>(response);
}

export async function deleteMaintenance(id: string): Promise<void> {
  const response = await fetch(`/api/maintenance/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete maintenance record");
  }
}
