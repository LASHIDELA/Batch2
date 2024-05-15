import { useAppSelector } from "@/store/hooks";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Button, Drawer, IconButton, Typography } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import SideBar from "./SideBar";

const TopBar = () => {
  const { data: session } = useSession();
  const { setLocation } = useAppSelector((store) => store.location);
  const [open, setOpen] = useState<boolean>(false);
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
      <Box sx={{ color: "#f6ff00", fontSize: { xs: "20px", sm: "40px" } }}>
        FD POS
      </Box>
      <Box sx={{ color: "white", fontSize: "40px" }}>
        <Typography sx={{ fontSize: { xs: "14px", sm: "20px" } }}>
          KC Foodie POS
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "14px", sm: "20px" },
            display: "flex",
            justifyContent: "center",
          }}
        >
          {setLocation?.name}
        </Typography>
      </Box>
      <Box sx={{ display: { sm: "none" } }}>
        <IconButton onClick={() => setOpen(true)} sx={{ color: "white" }}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: { xs: "none", sm: "block" } }}>
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
        <Drawer
          anchor="right"
          open={open}
          onClose={() => setOpen(false)}
          sx={{ display: { sm: "none" } }}
        >
          <SideBar />
        </Drawer>
      </Box>
    </Box>
  );
};

export default TopBar;
