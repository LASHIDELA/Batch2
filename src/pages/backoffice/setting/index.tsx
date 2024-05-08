import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateCompany } from "@/store/slices/companySlice";
import { setOpenSnackBar } from "@/store/slices/snackBarSlice";
import { UpdateCompanyOptions } from "@/type/company";
import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

const UpdateCompany = () => {
  const company = useAppSelector((store) => store.company.item);
  const [data, setData] = useState<UpdateCompanyOptions>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (company) {
      setData({
        id: company.id,
        name: company.name,
        street: company.street,
        townShip: company.townShip,
        city: company.city,
      });
    }
  }, [company]);

  if (!company || !data) return null;
  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: 300 }}>
        <TextField
          sx={{ width: 300, mb: 2 }}
          defaultValue={company.name}
          onChange={(
            evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setData({ ...data, name: evt.target.value })}
        />
        <TextField
          sx={{ width: 300, mb: 2 }}
          defaultValue={company.street}
          onChange={(
            evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setData({ ...data, street: evt.target.value })}
        />
        <TextField
          sx={{ width: 300, mb: 2 }}
          defaultValue={company.townShip}
          onChange={(
            evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setData({ ...data, townShip: evt.target.value })}
        />
        <TextField
          sx={{ width: 300, mb: 2 }}
          defaultValue={company.city}
          onChange={(
            evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setData({ ...data, city: evt.target.value })}
        />
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            variant="contained"
            disabled={
              !data.name && !data.city && !data.street && !data.townShip
            }
            onClick={() => {
              dispatch(
                updateCompany({
                  ...data,
                  onSuccess: () => {
                    setOpenSnackBar({
                      message: "Successfully Update table",
                      severity: "success",
                    });
                  },
                })
              );
            }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default UpdateCompany;
