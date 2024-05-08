import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import BackOfficeLayout from "./BackOfficeLayout";
import OrderLayout from "./OrderAppLayout";

interface Props {
  children: ReactNode;
}
const Layout = ({ children }: Props) => {
  const router = useRouter();
  const { tableId } = router.query;
  const isOrderApp = tableId;
  const isBackOffice = router.pathname.includes("/backoffice");
  if (isOrderApp) {
    return (
      <Box>
        <OrderLayout>{children}</OrderLayout>
      </Box>
    );
  } else if (isBackOffice) {
    return (
      <Box>
        <BackOfficeLayout>{children}</BackOfficeLayout>
      </Box>
    );
  } else {
    return <Box>{children}</Box>;
  }
};
export default Layout;
