import { useAppDispatch, useAppSelector } from "@/store/hooks";
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
  const companyId = useAppSelector((store) => store.company.item?.id);
  const [newLocation, setNewLocation] = useState({
    name: "",
    street: "",
    townShip: "",
    city: "",
  });
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
          />
          <TextField
            sx={{ my: 2 }}
            placeholder="Street"
            onChange={(
              evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setNewLocation({
                ...newLocation,
                street: String(evt.target.value),
              });
            }}
          />
          <TextField
            sx={{ my: 2 }}
            placeholder="Township"
            onChange={(
              evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setNewLocation({
                ...newLocation,
                townShip: String(evt.target.value),
              });
            }}
          />
          <TextField
            sx={{ my: 2 }}
            placeholder="City"
            onChange={(
              evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setNewLocation({
                ...newLocation,
                city: String(evt.target.value),
              });
            }}
          />
          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={() => setOpen(false)} variant="contained">
              Cancel
            </Button>
            <Button
              disabled={
                newLocation.name &&
                newLocation.street &&
                newLocation.townShip &&
                newLocation.city
                  ? false
                  : true
              }
              variant="contained"
              onClick={() => {
                dispatch(
                  createLocation({
                    ...newLocation,
                    companyId,
                    onSuccess: () => {
                      setOpen(false);
                    },
                  })
                );
              }}
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
