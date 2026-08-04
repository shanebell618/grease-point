import {
  createEquipment,
  deleteEquipment,
  fetchEquipmentById,
  fetchEquipmentList,
  updateEquipment,
} from "./api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { EquipmentStatus } from "./types";
import type { CreateEquipmentInput } from "@/server/schemas/equipment/createEquipmentInputSchema";
import { equipmentKeys } from "./queryKeys";

export function useEquipmentListQuery(status?: EquipmentStatus) {
  return useQuery({
    queryKey: equipmentKeys.list(status),
    queryFn: () => fetchEquipmentList(status),
  });
}

export function useEquipmentQuery(id: string) {
  return useQuery({
    queryKey: equipmentKeys.detail(id),
    queryFn: () => fetchEquipmentById(id),
  });
}

export function useCreateEquipmentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateEquipmentInput) => createEquipment(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: equipmentKeys.all });
    },
  });
}

export function useUpdateEquipmentMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: Partial<CreateEquipmentInput>) =>
      updateEquipment(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: equipmentKeys.all });
    },
  });
}

// TODO(optimistic-updates breadcrumb): delete is the natural first
// candidate — remove the item from the equipmentKeys.list() cache in
// onMutate, roll back onError, and skip the invalidate-on-success round trip.
export function useDeleteEquipmentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteEquipment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: equipmentKeys.all });
    },
  });
}
