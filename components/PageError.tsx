import { Typography } from "@mui/material";

type Props = {
  message: string;
};

export const PageError = ({ message }: Props) => {
  return <Typography>Oops..... {message}</Typography>;
};
