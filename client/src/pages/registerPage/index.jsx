import { Box, useMediaQuery, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import React from "react";

const RegisterPage = () => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <FlexBetween width={"100vw"} height={"100vh"} flexDirection={"column"}>
      <Box
        boxSizing={"border-box"}
        border={smallScreen ? "0rem" : "0.15rem solid"}
        py={2}
        borderRadius={3}
        borderColor={theme.palette.secondary.main}
        sx={{
          maxWidth: smallScreen ? "100%" : "52rem",
          width: "100%",
          height: smallScreen ? "100%" : "85%",
          maxHeight: smallScreen ? "100%" : "56rem",
          minHeight: "570px",
          px: "clamp(1rem, 1.5rem, 1.8rem)",
        }}
      ></Box>
    </FlexBetween>
  );
};

export default RegisterPage;
