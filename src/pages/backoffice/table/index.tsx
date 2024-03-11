import TableDialog from "@/component/dialog/TableDialog";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const Table = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Box sx={{ width: "100%" }}>
      <TableDialog open={open} setOpen={setOpen}></TableDialog>
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
        <Box>
          <Typography>Table</Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default Table;
