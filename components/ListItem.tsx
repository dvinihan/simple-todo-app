import { Card, Typography } from "@mui/material";
import Link from "next/link";

type Props = {
  dataTestId?: string;
  href: string;
  onClick?: () => void;
  text: string;
};

export const ListItem = ({ dataTestId = "", href, onClick, text }: Props) => {
  return (
    <Card
      sx={{
        marginTop: "10px",
        padding: "6px",
      }}
      variant="outlined"
    >
      <Link
        data-testid={dataTestId}
        href={href}
        style={{ color: "black", textDecoration: "none" }}
      >
        <Typography fontSize={"24px"} onClick={onClick}>
          {text}
        </Typography>
      </Link>
    </Card>
  );
};
