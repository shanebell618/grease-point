import type { Metadata } from "next";
import Container from "@mui/material/Container";
import { FeaturePlaceholder } from "@/common/components/FeaturePlaceholder";

export const metadata: Metadata = { title: "Documents | Grease Point" };

const Page = () => (
  <Container>
    <FeaturePlaceholder
      title="Documents"
      description="Manuals, PDFs, and receipts for the fleet."
      plannedFeatures={["Manuals", "PDFs", "Receipts"]}
      docsPath="src/verticals/documents/README.md"
    />
  </Container>
);

export default Page;
