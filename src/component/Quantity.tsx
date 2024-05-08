import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Box, Typography } from "@mui/material";

interface Props {
  handleDecreace: () => void;
  handleIncreace: () => void;
  quantityValue: number;
}
const Quantity = ({ handleDecreace, handleIncreace, quantityValue }: Props) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <RemoveCircleIcon
        color="error"
        fontSize="large"
        onClick={handleDecreace}
        sx={{ cursor: "pointer" }}
      />
      <Typography sx={{ mx: 3 }} variant="h5">
        {quantityValue < 10 ? "0" + quantityValue : quantityValue}
      </Typography>
      <AddCircleIcon
        color="success"
        fontSize="large"
        onClick={handleIncreace}
        sx={{ cursor: "pointer" }}
      />
    </Box>
  );
};

export default Quantity;
