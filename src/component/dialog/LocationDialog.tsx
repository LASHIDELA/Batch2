import { useAppDispatch } from "@/store/hooks";
import { createLocation } from "@/store/slices/locationSlice";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

interface Prop {
  open: boolean;
  setOpen: (data: any) => void;
}
const LocationDialog = ({ open, setOpen }: Prop) => {
  const [newLocation, setNewLocation] = useState({ name: "", address: "" });
  const dispatch = useAppDispatch();

  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Location</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            placeholder="Name"
            onChange={(
              evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setNewLocation({
                ...newLocation,
                name: String(evt.target.value),
              });
            }}
          ></TextField>
          <TextField
            sx={{ my: 2 }}
            placeholder="Address"
            onChange={(
              evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setNewLocation({
                ...newLocation,
                address: String(evt.target.value),
              });
            }}
          ></TextField>
          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={() => setOpen(false)} variant="contained">
              Cancel
            </Button>
            <Button
              disabled={newLocation.name && newLocation.address ? false : true}
              variant="contained"
              onClick={() => dispatch(createLocation(newLocation))}
            >
              Create
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default LocationDialog;
