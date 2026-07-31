import type { Metadata } from "next";
import Container from "@mui/material/Container";
import { FeaturePlaceholder } from "@/components/FeaturePlaceholder/FeaturePlaceholder";

export const metadata: Metadata = { title: "Inventory | Grease Point" };

const Page = () => (
  <Container>
    <FeaturePlaceholder
      title="Parts Inventory"
      description="Track filters, parts, and stock levels across the fleet."
      plannedFeatures={["Filters", "Search", "Categories"]}
      docsPath="src/features/inventory/README.md"
    />
  </Container>
);

export default Page;
