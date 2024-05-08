import { useAppSelector } from "@/store/hooks";
import { Box, Checkbox, FormControlLabel, Radio } from "@mui/material";
import { Addon } from "@prisma/client";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface Props {
  addonCategoryId: number;
  selectedAddons: Addon[];
  setSelectedAddons: Dispatch<SetStateAction<Addon[]>>;
}

const AddonsDetail = ({
  addonCategoryId,
  selectedAddons,
  setSelectedAddons,
}: Props) => {
  const addonCategory = useAppSelector(
    (store) => store.addonCategory.items
  ).find((item) => item.id === addonCategoryId);
  const addons = useAppSelector((store) => store.addon.items).filter(
    (item) => item.addonCategoryId === addonCategoryId
  );

  if (!addonCategory) return null;
  return (
    <Box>
      {addons.map((addon) => {
        return (
          <Box key={addon.id}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                control={
                  addonCategory.isRequired ? (
                    <Radio
                      checked={
                        selectedAddons.find((item) => item.id === addon.id)
                          ? true
                          : false
                      }
                      onChange={() => {
                        const addonIds = addons.map((item) => item.id);
                        const others = selectedAddons.filter(
                          (item) => !addons.includes(item)
                        );
                        setSelectedAddons([...others, addon]);
                      }}
                    />
                  ) : (
                    <Checkbox
                      checked={
                        selectedAddons.find((item) => item.id === addon.id)
                          ? true
                          : false
                      }
                      onChange={(evt: ChangeEvent<HTMLInputElement>, value) => {
                        if (value) {
                          setSelectedAddons([...selectedAddons, addon]);
                        } else {
                          const others = selectedAddons.filter(
                            (item) => item.id !== addon.id
                          );
                          setSelectedAddons(others);
                        }
                      }}
                    />
                  )
                }
                label={addon.name}
              />
              <Box>{addon.price === 0 ? "FOC" : addon.price}</Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
export default AddonsDetail;
