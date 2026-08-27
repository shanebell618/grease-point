import type { Metadata } from "next";
import { NewMaintenancePageView } from "@/verticals/maintenance/pages/NewMaintenancePageView";

export const metadata: Metadata = {
  title: "Add Maintenance Record | Grease Point",
};

const Page = () => <NewMaintenancePageView />;

export default Page;
