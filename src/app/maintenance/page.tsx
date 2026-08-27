import type { Metadata } from "next";
import { MaintenanceListPageView } from "@/verticals/maintenance/pages/MaintenanceListPageView";

export const metadata: Metadata = { title: "Maintenance | Grease Point" };

const Page = () => <MaintenanceListPageView />;

export default Page;
