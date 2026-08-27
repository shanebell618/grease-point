import {
  createMaintenance,
  deleteMaintenance,
  fetchMaintenanceById,
  fetchMaintenanceList,
  updateMaintenance,
} from "./api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { CreateMaintenanceInput } from "@/server/schemas/maintenance/createMaintenanceInputSchema";
import { equipmentKeys } from "@/verticals/equipment/queryKeys";
import { fetchActiveOrRecentlyCompletedMaintenance } from "./api";
import { maintenanceKeys } from "./queryKeys";

export function useMaintenanceListQuery(equipmentId?: string) {
  return useQuery({
    queryKey: maintenanceKeys.list(equipmentId),
    queryFn: () => fetchMaintenanceList(equipmentId),
  });
}

export function useActiveOrRecentlyCompletedMaintenanceQuery() {
  return useQuery({
    queryKey: maintenanceKeys.activeOrRecentlyCompleted(),
    queryFn: fetchActiveOrRecentlyCompletedMaintenance,
  });
}

export function useMaintenanceQuery(id: string) {
  return useQuery({
    queryKey: maintenanceKeys.detail(id),
    queryFn: () => fetchMaintenanceById(id),
  });
}

export function useCreateMaintenanceMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateMaintenanceInput) => createMaintenance(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.all });
      // Creating a maintenance record as IN_PROGRESS also flips its
      // equipment to OUT_OF_SERVICE server-side (see
      // syncEquipmentOutOfServiceUseCase) — equipment queries need to
      // refetch too, or the UI shows a stale status until reload.
      queryClient.invalidateQueries({ queryKey: equipmentKeys.all });
    },
  });
}

export function useUpdateMaintenanceMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: Partial<CreateMaintenanceInput>) =>
      updateMaintenance(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.all });
      // Same reasoning as useCreateMaintenanceMutation — moving a record
      // into IN_PROGRESS syncs its equipment's status server-side.
      queryClient.invalidateQueries({ queryKey: equipmentKeys.all });
    },
  });
}

export function useDeleteMaintenanceMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteMaintenance(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.all });
    },
  });
}
