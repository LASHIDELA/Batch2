import CategoryIcon from "@mui/icons-material/Category";
import ClassIcon from "@mui/icons-material/Class";
import EggIcon from "@mui/icons-material/Egg";
import KitchenIcon from "@mui/icons-material/Kitchen";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PinDropIcon from "@mui/icons-material/PinDrop";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import { Box, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Divider from "@mui/material/Divider";
import Link from "next/link";

const SideBar = () => {
  return (
    <Box
      sx={{
        bgcolor: "secondary.main",
        width: 250,
        height: "100vh",
        borderTopRightRadius: 20,
      }}
    >
      {sideBarApp.slice(0, 7).map((item) => (
        <Link key={item.id} href={item.href} style={{ textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
            <ListItemText sx={{ color: "white" }} primary={item.title} />
          </ListItemButton>
        </Link>
      ))}
      <Divider />
      {sideBarApp.slice(-1).map((item) => (
        <Link key={item.id} href={item.href} style={{ textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
            <ListItemText sx={{ color: "white" }} primary={item.title} />
          </ListItemButton>
        </Link>
      ))}
    </Box>
  );
};

export default SideBar;

export let sideBarApp = [
  {
    id: 1,
    title: "Orders",
    icon: <KitchenIcon />,
    href: "/backoffice/order",
  },
  {
    id: 2,
    title: "Menu Categories",
    icon: <CategoryIcon />,
    href: "/backoffice/menu-category",
  },
  {
    id: 3,
    title: "Menu",
    icon: <MenuBookIcon />,
    href: "/backoffice/menu",
  },
  {
    id: 4,
    title: "Addon",
    icon: <EggIcon />,
    href: "/backoffice/addon",
  },
  {
    id: 5,
    title: "Addon Category",
    icon: <ClassIcon />,
    href: "/backoffice/addon-category",
  },
  {
    id: 6,
    title: "Table",
    icon: <TableRestaurantIcon />,
    href: "/backoffice/table",
  },
  {
    id: 7,
    title: "Location",
    icon: <PinDropIcon />,
    href: "/backoffice/location",
  },
  {
    id: 8,
    title: "Setting",
    icon: <SettingsApplicationsIcon />,
    href: "/backoffice/setting",
  },
];
