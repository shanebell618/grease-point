import { EditEquipmentPageView } from "@/verticals/equipment/pages/EditEquipmentPageView";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  return <EditEquipmentPageView id={id} />;
};

export default Page;
