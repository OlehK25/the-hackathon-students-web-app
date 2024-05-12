"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import Image from "next/image";

import NavLink from "@/components/NavLink";

const AppBar = styled(MuiAppBar)(
  (): { backgroundColor: string; height: string } => ({
    backgroundColor: "white",
    height: "64px",
  }),
);

function Navigation({
  onAboutClick,
  onSupportClick,
}: {
  onAboutClick: () => void;
  onSupportClick: () => void;
}) {
  const [languagesSelected, setLanguagesSelected] =
    React.useState<string>("ua");

  const router = useRouter();

  const handleLanguagesClick = (name: string) => {
    setLanguagesSelected(name);
  };

  return (
    <AppBar
      position="fixed"
      className="w-full 2xl:max-w-screen-2xl rounded-b-2xl shadow-none	"
    >
      <Container
        maxWidth="xl"
        sx={{
          paddingX: {
            xs: "32px",
            md: "64px",
          },
          paddingLeft: {
            xs: "20px",
          },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "space-between",
            gap: "4px",
          }}
        >
          <div className="grow text-start">
            <div
              onClick={() => router.push("/")}
              className="hover:cursor-pointer flex-none relative w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]"
            >
              <Image
                src={"/Logo.svg"}
                alt={"App Logo"}
                fill={true}
                priority
                style={{
                  objectFit: "contain",
                  borderRadius: "50%",
                }}
                sizes="(max-width: 640px) 40px, 50px"
              />
            </div>
          </div>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              flexWrap: "wrap",
            }}
          >
            <NavLink listItemText={"Про нас"} onClick={onAboutClick} />
            <NavLink listItemText={"Підтримка"} onClick={onSupportClick} />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <button
              type="button"
              className="rounded-lg p-2 sm:w-[40px] max-sm:w-full max-xl:basis-full shadow-none"
              onClick={() => handleLanguagesClick("ua")}
              style={{
                textTransform: "uppercase",
                backgroundColor:
                  languagesSelected === "ua" ? "#e5eaff" : "white",
                color: "#2e409e",
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "20px",
              }}
            >
              ua
            </button>

            <button
              type="button"
              className="rounded-lg p-2 sm:w-[40px] max-sm:w-full max-xl:basis-full shadow-none"
              onClick={() => handleLanguagesClick("en")}
              style={{
                textTransform: "uppercase",
                backgroundColor:
                  languagesSelected === "en" ? "#e5eaff" : "white",
                color: "#2e409e",
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "20px",
              }}
            >
              en
            </button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navigation;
