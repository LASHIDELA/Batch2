import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAppData } from "@/store/slices/appSlice";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

interface Prop {
  children: ReactNode;
}
const Layout = ({ children }: Prop) => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { init } = useAppSelector((store) => store.app);

  useEffect(() => {
    if (session && !init) {
      dispatch(fetchAppData({}));
    }
  }, [session]);

  return (
    <Box>
      <TopBar />
      <Box sx={{ display: "flex", width: "100vs" }}>
        {session && (
          <Box>
            <SideBar />
          </Box>
        )}
        <Box sx={{ ml: 5, width: "100%" }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
