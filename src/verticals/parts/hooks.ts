import {
  createPart,
  deletePart,
  fetchPartById,
  fetchPartsList,
  updatePart,
} from "./api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { CreatePartInput } from "@/server/schemas/parts/createPartInputSchema";
import { partKeys } from "./queryKeys";

export function usePartsListQuery(search?: string) {
  return useQuery({
    queryKey: partKeys.list(search),
    queryFn: () => fetchPartsList(search),
  });
}

export function usePartQuery(id: string) {
  return useQuery({
    queryKey: partKeys.detail(id),
    queryFn: () => fetchPartById(id),
  });
}

export function useCreatePartMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreatePartInput) => createPart(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: partKeys.all });
    },
  });
}

export function useUpdatePartMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: Partial<CreatePartInput>) => updatePart(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: partKeys.all });
    },
  });
}

export function useDeletePartMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePart(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: partKeys.all });
    },
  });
}
