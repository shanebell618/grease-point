import type { Metadata } from "next";
import { NewEquipmentPageView } from "@/verticals/equipment/pages/NewEquipmentPageView";

export const metadata: Metadata = { title: "Add Equipment | Grease Point" };

const Page = () => <NewEquipmentPageView />;

export default Page;
