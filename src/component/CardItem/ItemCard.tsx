import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  title: string;
  icon: ReactNode;
  selected?: boolean;
  href?: string;
  subtitle?: string;
  isAvailable?: boolean;
  onClick?: () => void;
}

const ItemCard = ({
  title,
  href,
  icon,
  selected,
  subtitle,
  isAvailable,
  onClick,
}: Props) => {
  if (href) {
    return (
      <Link href={href} style={{ textDecoration: "none" }}>
        <Box>
          <Paper
            title={isAvailable === false ? "Unavailable" : ""}
            elevation={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: 160,
              height: 180,
              m: 1,
              bgcolor: isAvailable === false ? "lightgray" : "",
              opacity: isAvailable === false ? 0.6 : 1,
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
        onClick={() => onClick && onClick()}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: 160,
          height: 180,
          m: 1,
          cursor: "pointer",
          position: "relative",
        }}
      >
        {selected && (
          <CheckCircleOutlineIcon
            sx={{ position: "absolute", top: 10, right: 10, color: "#64CCC5" }}
          />
        )}

        <Typography>{icon}</Typography>
        <Typography>{title}</Typography>
        {subtitle && <Typography>{subtitle}</Typography>}
      </Paper>
    </Box>
  );
};
export default ItemCard;
