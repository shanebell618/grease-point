import type { Metadata } from "next";
import Container from "@mui/material/Container";
import { FeaturePlaceholder } from "@/common/components/FeaturePlaceholder";

export const metadata: Metadata = { title: "Maintenance | Grease Point" };

const Page = () => (
  <Container>
    <FeaturePlaceholder
      title="Maintenance"
      description="Schedules, service history, and due dates for the fleet."
      plannedFeatures={[
        "Oil changes",
        "Tire replacements",
        "Hydraulic service",
        "Completed work",
        "Due dates",
      ]}
      docsPath="src/verticals/maintenance/README.md"
    />
  </Container>
);

export default Page;
