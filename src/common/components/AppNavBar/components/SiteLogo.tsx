"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export const SiteLogo = () => {
  return (
    <Link href="/">
      <Box
        sx={{
          padding: 1,
        }}
      >
        <Image
          src="/logo.png"
          alt="Grease Point Logo"
          width={120}
          height={120}
          priority
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </Box>
    </Link>
  );
};
