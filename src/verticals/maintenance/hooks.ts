import {
  createMaintenance,
  deleteMaintenance,
  fetchMaintenanceById,
  fetchMaintenanceList,
  updateMaintenance,
} from "./api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { CreateMaintenanceInput } from "@/server/schemas/maintenance/createMaintenanceInputSchema";
import { maintenanceKeys } from "./queryKeys";

export function useMaintenanceListQuery(equipmentId?: string) {
  return useQuery({
    queryKey: maintenanceKeys.list(equipmentId),
    queryFn: () => fetchMaintenanceList(equipmentId),
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
