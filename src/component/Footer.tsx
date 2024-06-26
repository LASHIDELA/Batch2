import { Box, Typography } from "@mui/material";
import Image from "next/image";

const Footer = () => {
  return (
    <Box
      sx={{
        height: 150,
        bgcolor: "#4C4C6D",
        px: "12px",
      }}
    >
      <Box
        sx={{
          maxWidth: 1280,
          m: "0 auto",
          display: "flex",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Typography sx={{ color: "#E8F6EF", fontStyle: "italic" }}>
              Hintada Street 39 <br />
              Sanchaung, Yangon <br />
              contact@foodiepos.com
              <br />
              +95 123 456 79
            </Typography>
          </Box>
          <Image alt="logo" src={"/logo.png"} width={150} height={100} />
          <Box>
            <Typography sx={{ color: "#E8F6EF", fontStyle: "italic" }}>
              Order app
              <br /> Backoffice app
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
