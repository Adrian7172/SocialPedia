import { Home } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Image from "mui-image";
import React from "react";
import FlexBetween from "./FlexBetween";

const NavComponent = ({ name, icon }) => {
  return (
    <Box
      p="1rem 1.5rem"
      display="flex"
      gap="2rem"
      width="100%"
      sx={{
        cursor: "pointer",
      }}
    >
      <Image src={icon} width="2.2rem" height="2.2rem"></Image>
      <Typography
        variant="p"
        sx={{
          fontSize: "1.5rem",
          fontWeight: "500",
        }}
      >
        {name}
      </Typography>
    </Box>
  );
};

export default NavComponent;
