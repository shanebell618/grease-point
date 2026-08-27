import { MaintenanceDao } from "@/server/dataAccess/MaintenanceDao";

const RECENTLY_COMPLETED_WINDOW_DAYS = 7;

// The maintenance landing page is a "what needs attention" dashboard, not
// a full history browser — so completed work only shows up here for a
// short window after it's done, then drops off. The equipment detail
// page's history table still shows everything, indefinitely.
export const getAllActiveOrRecentlyCompletedMaintenanceUseCase = async () => {
  const completedAfter = new Date();
  completedAfter.setDate(
    completedAfter.getDate() - RECENTLY_COMPLETED_WINDOW_DAYS,
  );

  return MaintenanceDao.getAllActiveOrRecentlyCompleted(completedAfter);
};
