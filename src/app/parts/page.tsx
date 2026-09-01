import type { Metadata } from "next";
import Container from "@mui/material/Container";
import { FeaturePlaceholder } from "@/common/components/FeaturePlaceholder";

export const metadata: Metadata = { title: "Parts | Grease Point" };

const Page = () => (
  <Container>
    <FeaturePlaceholder
      title="Parts"
      description="Track filters, parts, and stock levels across the fleet."
      plannedFeatures={["Searchable parts table", "Low-stock indicator"]}
      docsPath="src/verticals/parts/README.md"
    />
  </Container>
);

export default Page;
