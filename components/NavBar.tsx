import { AppBar, Typography } from "@mui/material";

type Props = {
  title: string;
};

export const NavBar = ({ title }: Props) => {
  return (
    <AppBar>
      <Typography>{title}</Typography>
    </AppBar>
  );
};
