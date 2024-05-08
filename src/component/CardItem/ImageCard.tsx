import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Menu } from "@prisma/client";
import Link from "next/link";
interface Prop {
  menu: Menu;
  href: string | object;
  isAvailable?: boolean;
}
const ImageCard = ({ menu, href, isAvailable }: Prop) => {
  return (
    <Link href={href} style={{ textDecoration: "none", textAlign: "center" }}>
      <Box>
        <Card
          sx={{
            width: 190,
            height: 230,
            m: 1,
            opacity: isAvailable === false ? 0.6 : 1,
            bgcolor: isAvailable === false ? "lightgray" : "",
          }}
        >
          <CardMedia
            component="img"
            height="120px"
            image={menu.assetUrl || "/default-menu.png"}
            alt="Menu"
            sx={{ objectFit: "contain" }}
          />
          <CardContent>
            <Typography sx={{ fontWeight: "bold" }}>{menu.name}</Typography>
            {menu.description && <Typography>{menu.description}</Typography>}
            <Box>
              <IconButton aria-label="add to favorites">
                <MonetizationOnIcon color="success" />{" "}
                <Typography>{menu.price}</Typography>
              </IconButton>
            </Box>
          </CardContent>
          <CardActions disableSpacing></CardActions>
        </Card>
      </Box>
    </Link>
  );
};
export default ImageCard;
