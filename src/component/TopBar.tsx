import { Box, Button } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

const TopBar = () => {
  const { data: session } = useSession();

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
      <Box sx={{ color: "white", fontSize: "40px" }}>KC Foodie POS</Box>
      <Box>
        {session ? (
          <Button
            onClick={() => signOut({ callbackUrl: "/" })}
            variant="contained"
            sx={{ bgcolor: "secondary.main" }}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            variant="contained"
            sx={{ bgcolor: "secondary.main" }}
          >
            Sign In
          </Button>
          // <span />
        )}
      </Box>
    </Box>
  );
};

export default TopBar;
