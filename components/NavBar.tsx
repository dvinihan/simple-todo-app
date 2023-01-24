import { ArrowBack } from "@mui/icons-material";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { HOME_ROUTE } from "../constants";
import { useAppContext } from "../context/use-app-context";

type Props = {
  backUrl?: string;
  title: string;
};

export const NavBar = ({ backUrl, title }: Props) => {
  const router = useRouter();
  const { hasChanges, setDiscardModalState } = useAppContext();

  const handleBackClick = useCallback(() => {
    if (hasChanges) {
      setDiscardModalState({ open: true, redirectUrl: backUrl ?? HOME_ROUTE });
    } else if (backUrl) {
      router.push(backUrl);
    }
  }, [backUrl, hasChanges, router, setDiscardModalState]);

  return (
    <>
      <AppBar>
        <Toolbar>
          {backUrl && (
            <ArrowBack
              fontSize="large"
              onClick={handleBackClick}
              sx={{ marginRight: "10px" }}
            />
          )}
          <Typography fontSize={"30px"}>{title}</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ marginBottom: "66px" }}></Box>
    </>
  );
};
