import { useTheme } from "@emotion/react";
import { Avatar, Box, Link, Typography, useMediaQuery } from "@mui/material";
import Image from "mui-image";
import React from "react";
import FlexBetween from "./FlexBetween";
import Wrapper from "./Wrapper";
import cover from "../assets/cover.jpg";
import PeopleCard from "./PeopleCard";

function Rightbar() {
  const theme = useTheme();
  const mediumScreen = useMediaQuery("(max-width: 1000px)");
  return (
    <>
      <Box
        display={mediumScreen ? "none" : "block"}
        flexDirection="column"
        flex={2}
        sx={{
          position: "sticky",
          top: "6.1rem",
          overflowY: "scroll",
          height: "calc(100vh - 10rem)",

          "&::-webkit-scrollbar": {
            display: "none",
          },
          "&::-moz-scrollbar": {
            display: "none",
          },
        }}
      >
        <Box
          width="100%"
          sx={{
            margin: "1.2rem 0",
            border: "1px solid",
            borderColor: theme.palette.secondary.main,
            borderRadius: "1rem",
            cursor: "pointer",
          }}
        >
          <FlexBetween
            sx={{
              flexDirection: "column",
              width: "100%",
              height: "max-content",
              boxSizing: "border-box",
            }}
          >
            <Image
              width="100%"
              height="10rem"
              src={cover}
              sx={{
                borderRadius: "1rem 1rem 0 0",
              }}
            />
            <Avatar
              sx={{
                mt: "-3rem",
                width: "6rem",
                height: "6rem",
              }}
            />
          </FlexBetween>
          <FlexBetween flexDirection="column" mb={2}>
            <Typography
              variant="p"
              sx={{
                mt: "1rem",
                fontWeight: "500",
              }}
            >
              Aman Chauhan
            </Typography>
            <Typography
              lineHeight={1.3}
              color={theme.palette.neutral.light}
              sx={{
                fontSize: "1.1rem",
                textAlign: "center",
                m: "0",
                p: "0",
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Inventore, doloribus?
            </Typography>
          </FlexBetween>
        </Box>
        <Wrapper>
          <Box margin="0.8rem">
            <Typography
              variant="h5"
              color={theme.palette.neutral.light}
              sx={{
                fontSize: "1.4rem",
              }}
            >
              Recomended for you
            </Typography>
          </Box>
          <PeopleCard
            imageStyle={{ width: "3.5rem", height: "3.5rem" }}
            titleStyle={{ fontSize: "1.3rem", fontWeight: "600" }}
            bioStyle={{
              fontSize: "1.1rem",
            }}
          />
          <PeopleCard
            imageStyle={{ width: "3.5rem", height: "3.5rem" }}
            titleStyle={{ fontSize: "1.3rem", fontWeight: "600" }}
            bioStyle={{
              fontSize: "1.1rem",
            }}
          />
          <PeopleCard
            imageStyle={{ width: "3.5rem", height: "3.5rem" }}
            titleStyle={{ fontSize: "1.3rem", fontWeight: "600" }}
            bioStyle={{
              fontSize: "1.1rem",
            }}
          />
          <FlexBetween fontSize="1.2rem" display="flex" pl="auto">
            <Link
              href="/peoples"
              sx={{
                cursor: "pointer",
                marginLeft: "auto",
              }}
            >
              ...view more
            </Link>
          </FlexBetween>
        </Wrapper>
        <Wrapper>
          <Box margin="0.8rem">
            <Typography
              variant="h5"
              color={theme.palette.neutral.light}
              sx={{
                fontSize: "1.4rem",
              }}
            >
              Friends
            </Typography>
          </Box>
          <PeopleCard
            imageStyle={{ width: "3.5rem", height: "3.5rem" }}
            titleStyle={{ fontSize: "1.3rem", fontWeight: "600" }}
            bioStyle={{
              fontSize: "1.1rem",
            }}
          />
          <PeopleCard
            imageStyle={{ width: "3.5rem", height: "3.5rem" }}
            titleStyle={{ fontSize: "1.3rem", fontWeight: "600" }}
            bioStyle={{
              fontSize: "1.1rem",
            }}
          />
          <PeopleCard
            imageStyle={{ width: "3.5rem", height: "3.5rem" }}
            titleStyle={{ fontSize: "1.3rem", fontWeight: "600" }}
            bioStyle={{
              fontSize: "1.1rem",
            }}
          />
          <PeopleCard
            imageStyle={{ width: "3.5rem", height: "3.5rem" }}
            titleStyle={{ fontSize: "1.3rem", fontWeight: "600" }}
            bioStyle={{
              fontSize: "1.1rem",
            }}
          />
          <FlexBetween fontSize="1.2rem" display="flex" pl="auto">
            <Link
              href="/friends"
              sx={{
                cursor: "pointer",
                marginLeft: "auto",
              }}
            >
              ...view more
            </Link>
          </FlexBetween>
        </Wrapper>
      </Box>
    </>
  );
}

export default Rightbar;
