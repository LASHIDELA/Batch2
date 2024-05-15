import LocationCardItem from "@/component/CardItem/ItemCard";
import LocationDialog from "@/component/dialog/LocationDialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setChangeLocation } from "@/store/slices/locationSlice";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const Location = () => {
  const { items: locations, setLocation } = useAppSelector(
    (store) => store.location
  );
  console.log("locaiton is", setLocation);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", sm: "flex-end" },
          mt: 2,
          mr: 2,
        }}
      >
        <Button variant="contained" onClick={() => setOpen(true)}>
          Create
        </Button>
        <LocationDialog open={open} setOpen={setOpen} />
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-start" },
            flexWrap: "wrap",
          }}
        >
          {locations.map((item) => (
            <LocationCardItem
              key={item.id}
              icon={<LocationOnIcon />}
              title={item.name}
              selected={item.id === setLocation?.id}
              onClick={() =>
                dispatch(
                  setChangeLocation(item),
                  localStorage.setItem("LocationId", String(item.id))
                )
              }
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Location;
