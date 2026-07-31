import type { Metadata } from "next";
import { EquipmentCreatePage } from "@/features/equipment/EquipmentCreatePage";

export const metadata: Metadata = { title: "Add Equipment | Grease Point" };

const Page = () => <EquipmentCreatePage />;

export default Page;
