import { Box, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  title: string;
  icon: ReactNode;
  href?: string;
  subtitle?: string;
}

const LocationCardItem = ({ title, href, icon, subtitle }: Props) => {
  if (href) {
    return (
      <Link href={href} style={{ textDecoration: "none" }}>
        <Box>
          <Paper
            elevation={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: 160,
              height: 180,
              m: 1,
            }}
          >
            <Typography>{icon}</Typography>
            <Typography>{title}</Typography>
            {subtitle && <Typography>{subtitle}</Typography>}
          </Paper>
        </Box>
      </Link>
    );
  }
  return (
    <Box>
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: 160,
          height: 180,
          m: 1,
        }}
      >
        <Typography>{icon}</Typography>
        <Typography>{title}</Typography>
        {subtitle && <Typography>{subtitle}</Typography>}
      </Paper>
    </Box>
  );
};
export default LocationCardItem;
