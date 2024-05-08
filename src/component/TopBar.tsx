import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

const TopBar = () => {
  const { data: session } = useSession();
  const { setLocation } = useAppSelector((store) => store.location);
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        height: 60,
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 5,
      }}
    >
      <Box sx={{ color: "#f6ff00", fontSize: "40px" }}>FD POS</Box>
      <Box sx={{ color: "white", fontSize: "40px" }}>
        <Typography>KC Foodie POS</Typography>
        <Typography
          sx={{ fontSize: "12px", display: "flex", justifyContent: "center" }}
        >
          {setLocation?.name}
        </Typography>
      </Box>
      <Box>
        {session ? (
          <Button
            onClick={() => signOut({ callbackUrl: "/backoffice" })}
            variant="contained"
            sx={{ bgcolor: "secondary.main" }}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            onClick={() => signIn("google", { callbackUrl: "/backoffice" })}
            variant="contained"
            sx={{ bgcolor: "secondary.main" }}
          >
            Sign In
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default TopBar;
