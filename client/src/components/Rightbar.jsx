import { Box } from "@mui/material";
import React from "react";
import FlexBetween from "./FlexBetween";
import Wrapper from "./Wrapper";

function Rightbar() {
  return (
    <FlexBetween flexDirection="column" flexGrow={1}>
      <Wrapper width="100%">
        Rightbar
      </Wrapper>
    </FlexBetween>
  );
}

export default Rightbar;
