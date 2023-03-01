import { Home } from "@mui/icons-material";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "mui-image";
import React from "react";
import FlexBetween from "./FlexBetween";

const NavComponent = ({ name, icon }) => {
  const theme = useTheme();

  /*  BREAK POINTS */
  const tabScreen = useMediaQuery("(max-width:765px)");

  const Name = "Home";

  return (
    <Box
      p="0 1.5rem"
      height="4rem"
      display="flex"
      gap="2rem"
      width="100%"
      sx={{
        margin: "0.4rem 0",
        alignItems: "center",
        cursor: "pointer",
        justifyContent: tabScreen ? "center" : "",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          width: "max-content",
          borderBottom: Name === name && tabScreen ? "3px solid" : "",
          borderColor: theme.palette.primary.main,
          padding: "0 1rem",
        }}
      >
        <Image src={icon} width="2.5rem" height="2.2rem"></Image>
      </Box>

      <Typography
        variant="p"
        sx={{
          fontSize: "1.5rem",
          fontWeight: "500",
          display: tabScreen ? "none" : "block",
        }}
      >
        {name}
      </Typography>
    </Box>
  );
};

export default NavComponent;
