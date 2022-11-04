import { AppBar, Box, Toolbar, Typography } from "@mui/material";

type Props = {
  title: string;
};

export const NavBar = ({ title }: Props) => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography fontSize={"30px"}>{title}</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ marginBottom: "66px" }}></Box>
    </>
  );
};
