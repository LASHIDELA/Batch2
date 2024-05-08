import ItemCard from "@/component/CardItem/ItemCard";
import AddonDialog from "@/component/dialog/AddonDialog";
import { useAppSelector } from "@/store/hooks";
import EggIcon from "@mui/icons-material/Egg";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const Addon = () => {
  const [open, setOpen] = useState<boolean>(false);
  const addons = useAppSelector((store) => store.addon.items);
  return (
    <Box sx={{ width: "100%" }}>
      <AddonDialog open={open} setOpen={setOpen} />
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
          {addons.map((item) => (
            <ItemCard
              key={item.id}
              icon={<EggIcon />}
              title={item.name}
              href={`/backoffice/addon/${item.id}`}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
export default Addon;
