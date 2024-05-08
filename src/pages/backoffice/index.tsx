import { Box, Button } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });
interface Props {
  children: ReactNode;
}
const BackOffice = () => {
  const { data: session } = useSession();
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
        <Button
          onClick={() => signIn("google", { callbackUrl: "/backoffice" })}
          variant="contained"
          sx={{ bgcolor: "secondary.main" }}
        >
          Sign In
        </Button>
      </Box>
    );
  } else {
    route.push("backoffice/orders");
  }
};
export default BackOffice;
