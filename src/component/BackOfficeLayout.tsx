import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAppData } from "@/store/slices/appSlice";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

interface Prop {
  children: ReactNode;
}
const BackOfficeLayout = ({ children }: Prop) => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { init } = useAppSelector((store) => store.app);
  const router = useRouter();
  useEffect(() => {
    if (session && !init) {
      dispatch(fetchAppData({}));
    }
    if (!session) {
      router.push("/backoffice");
    }
  }, [session]);

  return (
    <Box sx={{ maxWidth: "100vw" }}>
      <TopBar />
      <Box
        sx={{
          display: "flex",
        }}
      >
        {session && (
          <Box
            sx={{
              height: "100vh",
              display: { xs: "none", sm: "block" },
            }}
          >
            <SideBar />
          </Box>
        )}
        <Box
          sx={{
            ml: { sm: 5 },
            width: "100%",
            display: { xs: "flex", sm: "block" },
            justifyContent: { xs: "center", sm: "block" },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default BackOfficeLayout;
