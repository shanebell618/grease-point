import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createEquipment,
  deleteEquipment,
  fetchEquipmentById,
  fetchEquipmentList,
  updateEquipment,
} from "./api";
import { equipmentKeys } from "./queryKeys";
import type { EquipmentInput } from "./schema";
import type { EquipmentStatus } from "./types";

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
    mutationFn: (input: EquipmentInput) => createEquipment(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: equipmentKeys.all });
    },
  });
}

export function useUpdateEquipmentMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: Partial<EquipmentInput>) => updateEquipment(id, input),
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
