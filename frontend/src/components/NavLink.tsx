import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({
  href,
  listItemText,
  onClick,
  classes,
}: {
  listItemText: string;
  href?: string;
  onClick?: () => void;
  classes?: any;
}) {
  const pathname = usePathname();

  const basePath = href ? href.split("/")[1] : "";
  const active = pathname.includes(basePath);

  return (
    <Link
      href={href || ""}
      onClick={onClick}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="hover:text-[#2e409e]"
    >
      <Typography
        sx={{
          whiteSpace: "nowrap",
          color: active ? "#2e409e" : "black",
          fontWeight: active ? 700 : 600,
          fontSize: "14px",
          letterSpacing: "1.3px",
          fontFamily: "Helvetica",
          padding: classes?.padding
            ? `${classes.padding.y} ${classes.padding.x}`
            : "16px",
          "&:hover": {
            color: "#2e409e",
          },
        }}
      >
        {listItemText}
      </Typography>
    </Link>
  );
}

export default NavLink;
