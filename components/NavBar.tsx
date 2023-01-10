import { ArrowBack } from "@mui/icons-material";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router";

type Props = {
  backUrl?: string;
  title: string;
};

export const NavBar = ({ backUrl, title }: Props) => {
  const router = useRouter();

  return (
    <>
      <AppBar>
        <Toolbar>
          {/* {backUrl && (
            <ArrowBack
              fontSize="large"
              onClick={() => router.push(backUrl)}
              sx={{ marginRight: "10px" }}
            />
          )} */}
          <Typography fontSize={"30px"}>{title}</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ marginBottom: "66px" }}></Box>
    </>
  );
};
