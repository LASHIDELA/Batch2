import { useAppSelector } from "@/store/hooks";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

interface Props {
  counter: number;
}
const OrderAppHeader = ({ counter }: Props) => {
  const { query, ...router } = useRouter();
  const activeOrder = router.pathname.includes("/order/active-order");
  const isCart = router.pathname === "/order/cart";
  const isHome = router.pathname === "/order";
  const company = useAppSelector((store) => store.company.item);
  const orderApp = isCart || activeOrder;

  if (!company) return null;
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "fixed",
        zIndex: 5,

        top: 0,
      }}
    >
      {orderApp ? (
        <Box
          sx={{
            position: "absolute",
            right: { xs: 40, md: 80, lg: 150 },
            top: 10,
            cursor: "pointer",
            display: "flex",
          }}
        >
          <HomeIcon
            sx={{ fontSize: "50px" }}
            onClick={() =>
              router.push({
                pathname: "/order",
                query: { tableId: query.tableId },
              })
            }
          />
        </Box>
      ) : (
        <Box
          sx={{
            position: "absolute",
            right: { xs: 10, md: 80, lg: 150 },
            top: 10,
            cursor: "pointer",
            display: "flex",
          }}
        >
          <AddShoppingCartIcon
            onClick={() => {
              router.push({ pathname: "/order/cart", query: query });
            }}
          />

          {counter > 0 ? (
            <Typography> {counter}</Typography>
          ) : (
            <Typography sx={{ opacity: 0 }}>{0}</Typography>
          )}
        </Box>
      )}

      <Image
        src={"/order-app-header.svg"}
        width={0}
        height={0}
        sizes={"100vw"}
        alt={"Order App"}
        style={{ width: "100%", height: "1%" }}
      />
      {isHome && (
        <Box
          sx={{
            zIndex: 5,
            position: "absolute",
            top: 100,
            textAlign: "center",
            display: { xs: "none", sm: "block" },
          }}
        >
          <Typography sx={{ fontSize: { sm: 26 }, fontWeight: { sm: "bold" } }}>
            {company.name}
          </Typography>
          <Typography>{company.street}</Typography>
          <Typography>
            {company.townShip},{company.city}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
export default OrderAppHeader;
