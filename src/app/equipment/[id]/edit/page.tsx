import { EquipmentEditPage } from "@/features/equipment/EquipmentEditPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  return <EquipmentEditPage id={id} />;
};

export default Page;
