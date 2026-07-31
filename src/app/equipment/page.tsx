import type { Metadata } from "next";
import { EquipmentListPage } from "@/features/equipment/EquipmentListPage";

export const metadata: Metadata = { title: "Equipment | Grease Point" };

const Page = () => <EquipmentListPage />;

export default Page;
