import type { Metadata } from "next";
import Container from "@mui/material/Container";
import { FeaturePlaceholder } from "@/common/components/FeaturePlaceholder";

export const metadata: Metadata = { title: "Settings | Grease Point" };

const Page = () => (
  <Container>
    <FeaturePlaceholder
      title="Settings"
      description="Account and application preferences."
      plannedFeatures={["Dark mode", "Notification preferences", "Account"]}
      docsPath="TODO.md"
    />
  </Container>
);

export default Page;
