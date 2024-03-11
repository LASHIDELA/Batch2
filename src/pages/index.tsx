import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });
interface Props {
  children: ReactNode;
}
const Home = () => {
  const { data: session } = useSession();
  console.log(session);
  const route = useRouter();
  if (!session) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          width: "90vw",
        }}
      >
        Welcome To Our Restaurant
      </Box>
    );
  } else {
    route.push("backoffice/order");
  }
};
export default Home;
