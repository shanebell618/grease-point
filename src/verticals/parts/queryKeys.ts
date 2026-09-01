export const partKeys = {
  all: ["parts"] as const,
  list: (search?: string) =>
    [...partKeys.all, "list", search ?? "ALL"] as const,
  detail: (id: string) => [...partKeys.all, "detail", id] as const,
};
