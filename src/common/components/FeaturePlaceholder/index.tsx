import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface FeaturePlaceholderProps {
  title: string;
  description: string;
  plannedFeatures: string[];
  /** Repo-relative path to the feature's breadcrumb README, e.g.
   * "src/verticals/maintenance/README.md" — shown as reference text, not a
   * real link, since it isn't a route the deployed app can serve. */
  docsPath?: string;
}

export const FeaturePlaceholder = ({
  title,
  description,
  plannedFeatures,
  docsPath,
}: FeaturePlaceholderProps) => {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {description}
      </Typography>
      <Chip label="Coming soon" size="small" sx={{ mb: 3 }} />
      <Stack spacing={1}>
        {plannedFeatures.map((feature) => (
          <Typography key={feature} component="li" sx={{ listStyle: "none" }}>
            • {feature}
          </Typography>
        ))}
      </Stack>
      {docsPath && (
        <Typography sx={{ mt: 3 }}>
          See <code>{docsPath}</code> for what to build next.
        </Typography>
      )}
    </Box>
  );
};
