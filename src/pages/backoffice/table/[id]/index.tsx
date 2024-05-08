import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOpenSnackBar } from "@/store/slices/snackBarSlice";
import { deleteTable, updateTable } from "@/store/slices/tableSlice";
import { UpdateTableOptions } from "@/type/table";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

const UpdateTable = () => {
  const router = useRouter();
  const tableId = Number(router.query.id);
  const tables = useAppSelector((store) => store.table.items);
  const table = tables.find((item) => item.id === tableId);
  const [data, setData] = useState<UpdateTableOptions>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (table) {
      setData({ name: table.name, id: table.id });
    }
  }, [table]);
  const handleDelete = () => {
    dispatch(
      deleteTable({
        id: tableId,
        onSuccess: () => {
          setOpenSnackBar({
            message: "Successfully Deleted",
            severity: "success",
          }),
            router.push("/backoffice/table");
        },
      })
    );
  };
  if (!data || !table) return null;
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, mr: 3 }}>
        <Button variant="outlined" color={"error"} onClick={handleDelete}>
          Delete
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: 300 }}>
        <TextField
          sx={{ width: 300, mb: 2 }}
          defaultValue={table.name}
          onChange={(
            evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setData({ ...data, name: evt.target.value })}
        ></TextField>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            variant="contained"
            onClick={() => router.push("/backoffice/table")}
          >
            Cancle
          </Button>
          <Button
            variant="contained"
            disabled={!data.name}
            onClick={() => {
              dispatch(
                updateTable({
                  ...data,
                  onSuccess: () => {
                    setOpenSnackBar({
                      message: "Successfully Update table",
                      severity: "success",
                    }),
                      router.push("/backoffice/table");
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
export default UpdateTable;
