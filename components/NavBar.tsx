import { ArrowBack } from "@mui/icons-material";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "../pages/_app";

export const NavBar = () => {
  const {
    pageTitle = "",
    hrefStack = [],
    removeLastHrefFromStack,
  } = useContext(AppContext) ?? {};

  return (
    <>
      <AppBar>
        <Toolbar>
          {hrefStack.length > 0 && (
            <Link href={hrefStack[-1]}>
              <ArrowBack
                fontSize="large"
                onClick={() => removeLastHrefFromStack?.()}
                sx={{ marginRight: "10px" }}
              />
            </Link>
          )}
          <Typography fontSize={"30px"}>{pageTitle}</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ marginBottom: "66px" }}></Box>
    </>
  );
};
