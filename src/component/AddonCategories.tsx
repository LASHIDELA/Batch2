import { useAppSelector } from "@/store/hooks";
import { Box, Chip, Typography } from "@mui/material";
import { Addon, AddonCategory } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import AddonsDetail from "./Addons";

interface Props {
  menuId: number;
  selectedAddons: Addon[];
  setSelectedAddons: Dispatch<SetStateAction<Addon[]>>;
  addonCategories: AddonCategory[];
}
const AddonCategoriesDetail = ({
  menuId,
  selectedAddons,
  setSelectedAddons,
  addonCategories,
}: Props) => {
  const addons = useAppSelector((item) => item.addon.items);
  return (
    <Box sx={{ mx: { xs: 2 } }}>
      {addonCategories.map((addonCategory) => {
        return (
          <Box key={addonCategory.id}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography sx={{ mr: 6 }}>{addonCategory.name}</Typography>
              <Typography sx={{ ml: 6 }}>
                {addonCategory.isRequired === true ? (
                  <Chip label="Required" />
                ) : (
                  <Chip label="Option " />
                )}
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <AddonsDetail
                setSelectedAddons={setSelectedAddons}
                selectedAddons={selectedAddons}
                addonCategoryId={addonCategory.id}
              />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default AddonCategoriesDetail;
