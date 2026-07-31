import { EquipmentDetailPage } from "@/features/equipment/EquipmentDetailPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  return <EquipmentDetailPage id={id} />;
};

export default Page;
