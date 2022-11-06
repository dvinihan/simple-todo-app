import { Box, Button, ButtonProps } from "@mui/material";

type Props = {
  color?: ButtonProps["color"];
  onClick: () => void;
  text: string;
};

export const ActionButton = ({ color, onClick, text }: Props) => {
  return (
    <Box sx={{ marginY: "20px" }}>
      <Button
        color={color}
        fullWidth
        onClick={onClick}
        sx={{ fontSize: "20px" }}
        variant="contained"
      >
        {text}
      </Button>
    </Box>
  );
};
