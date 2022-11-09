import { Typography } from "@mui/material";

type Props = {
  message: string;
};

export const ErrorPage = ({ message }: Props) => {
  return <Typography>{message}</Typography>;
};
