import { Card, Typography } from "@mui/material";
import Link from "next/link";

type Props = {
  href: string;
  text: string;
};

export const ListItem = ({ href, text }: Props) => {
  return (
    <Card
      sx={{
        marginTop: "10px",
        padding: "6px",
      }}
      variant="outlined"
    >
      <Link href={href}>
        <Typography fontSize={"24px"}>{text}</Typography>
      </Link>
    </Card>
  );
};
