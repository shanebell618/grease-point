import type { Metadata } from "next";
import Container from "@mui/material/Container";
import { FeaturePlaceholder } from "@/common/components/FeaturePlaceholder";

export const metadata: Metadata = { title: "Dashboard | Grease Point" };

const Page = () => (
  <Container>
    <FeaturePlaceholder
      title="Dashboard"
      description="An at-a-glance summary of the fleet."
      plannedFeatures={[
        "Equipment currently in service",
        "Upcoming maintenance",
        "Recent repairs",
        "Equipment value",
        "Hours logged",
      ]}
    />
  </Container>
);

export default Page;
