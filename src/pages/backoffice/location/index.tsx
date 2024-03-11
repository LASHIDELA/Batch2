import LocationDialog from "@/component/dialog/LocationDialog";
import { useAppSelector } from "@/store/hooks";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

const Location = () => {
  const [open, setOpen] = useState<boolean>(false);
  const locations = useAppSelector((store) => store.location.items);
  let location;
  const handleChange = (evt: SelectChangeEvent<any>) => {
    localStorage.setItem("LocationId", String(evt.target.value));
  };
  return (
    <Box sx={{ width: "100%" }}>
      <LocationDialog open={open} setOpen={setOpen} />
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
        <Box width={250}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Location</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={location}
              label="Locaitons"
              onChange={handleChange}
            >
              {locations.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default Location;
