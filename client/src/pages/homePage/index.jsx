import { Container, Stack } from "@mui/material";
import Home from "components/Home";
import Leftbar from "components/Leftbar";
import Navbar from "components/Navbar";
import Rightbar from "components/Rightbar";
import React from "react";

const HomePage = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Container maxWidth="lg">
        <Stack gap={2} direction="row" alignItems="flex-start" mt="1rem">
          <Leftbar />
          <Home />
          <Rightbar />
        </Stack>
      </Container>
    </React.Fragment>
  );
};

export default HomePage;
