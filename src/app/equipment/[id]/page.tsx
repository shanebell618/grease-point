import { EquipmentPageView } from "@/verticals/equipment/pages/EquipmentPageView";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  return <EquipmentPageView id={id} />;
};

export default Page;
