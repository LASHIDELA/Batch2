import ItemCard from "@/component/CardItem/ItemCard";
import TableDialog from "@/component/dialog/TableDialog";
import { useAppSelector } from "@/store/hooks";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const Table = () => {
  const [open, setOpen] = useState<boolean>(false);
  let tables = useAppSelector((store) => store.table.items).filter(
    (item) => item.locationId === Number(localStorage.getItem("LocationId"))
  );
  const handlePrintQR = (assetUrl: string) => {
    const imageWindow = window.open("", "_blank");
    imageWindow?.document.write(
      `<html><head><title>Table QR</title></head><body><img src="${assetUrl}" onload="window.print(); window.close()" /></body></htm>`
    );
    imageWindow.document.close();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TableDialog open={open} setOpen={setOpen}></TableDialog>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            sx={{ mt: 2, mr: 2 }}
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Create
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {tables.map((item) => (
            <Box key={item.id}>
              <ItemCard
                icon={<TableRestaurantIcon />}
                href={`/backoffice/table/${item.id}`}
                title={item.name}
              />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                {}
                <Button
                  variant="contained"
                  onClick={() => handlePrintQR(item.qrcodeUrl)}
                >
                  Print QR
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
export default Table;
