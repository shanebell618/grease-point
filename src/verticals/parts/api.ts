import type { CreatePartInput } from "@/server/schemas/parts/createPartInputSchema";
import type { Part } from "./types";

async function parseOrThrow<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(
      body?.error ? JSON.stringify(body.error) : response.statusText,
    );
  }
  return response.json();
}

export async function fetchPartsList(search?: string): Promise<Part[]> {
  const url = search
    ? `/api/parts?search=${encodeURIComponent(search)}`
    : "/api/parts";
  const response = await fetch(url);
  return parseOrThrow<Part[]>(response);
}

export async function fetchPartById(id: string): Promise<Part> {
  const response = await fetch(`/api/parts/${id}`);
  return parseOrThrow<Part>(response);
}

export async function createPart(input: CreatePartInput): Promise<Part> {
  const response = await fetch("/api/parts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return parseOrThrow<Part>(response);
}

export async function updatePart(
  id: string,
  input: Partial<CreatePartInput>,
): Promise<Part> {
  const response = await fetch(`/api/parts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return parseOrThrow<Part>(response);
}

export async function deletePart(id: string): Promise<void> {
  const response = await fetch(`/api/parts/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Failed to delete part");
  }
}
