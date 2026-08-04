import type { Metadata } from "next";
import Container from "@mui/material/Container";
import { FeaturePlaceholder } from "@/common/components/FeaturePlaceholder";

export const metadata: Metadata = { title: "Analytics | Grease Point" };

const Page = () => (
  <Container>
    <FeaturePlaceholder
      title="Analytics"
      description="Cost and maintenance trends across the fleet."
      plannedFeatures={[
        "Repair cost over time",
        "Maintenance frequency",
        "Cost per machine",
      ]}
      docsPath="src/verticals/analytics/README.md"
    />
  </Container>
);

export default Page;
