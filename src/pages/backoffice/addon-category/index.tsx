import ItemCard from "@/component/CardItem/ItemCard";
import AddonCategoryDialog from "@/component/dialog/AddonCategoryDialog";
import { useAppSelector } from "@/store/hooks";
import ClassIcon from "@mui/icons-material/Class";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const AddonCategory = () => {
  const [open, setOpen] = useState<boolean>(false);
  const addonCategories = useAppSelector((store) => store.addonCategory.items);

  return (
    <Box sx={{ width: "100%" }}>
      <AddonCategoryDialog open={open} setOpen={setOpen} />
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-end" },
          }}
        >
          <Button
            sx={{ mt: 2, mr: 2 }}
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Create
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-start" },
            flexWrap: "wrap",
          }}
        >
          {addonCategories.map((item) => (
            <ItemCard
              key={item.id}
              icon={<ClassIcon />}
              title={item.name}
              href={`/backoffice/addon-category/${item.id}`}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AddonCategory;
