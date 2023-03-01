import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import CustDivider from "components/CustDivider";
import FlexBetween from "components/FlexBetween";
import PeopleCard from "components/PeopleCard";
import Wrapper from "components/Wrapper";
import React from "react";

const PeoplePage = () => {
  const theme = useTheme();
  return (
    <Box flexDirection="column" flex={5} pb="8rem">
      <Wrapper>
        <Box p="0 1rem" margin="1rem 0 3rem 0">
          <Typography
            variant="h5"
            color={theme.palette.neutral.light}
            sx={{
              fontSize: "1.8rem",
              fontWeight: "600",
            }}
          >
            Recommendation for you
          </Typography>
        </Box>
        <PeopleCard
          imageStyle={{ width: "6rem", height: "6rem" }}
          titleStyle={{ fontSize: "1.8rem", fontWeight: "600" }}
          bioStyle={{
            fontSize: "1.4rem",
          }}
          addFriend={true}
          divider={true}
        />
        <PeopleCard
          imageStyle={{ width: "6rem", height: "6rem" }}
          titleStyle={{ fontSize: "1.8rem", fontWeight: "600" }}
          bioStyle={{
            fontSize: "1.4rem",
          }}
          addFriend={true}
          divider={true}
        />
        <PeopleCard
          imageStyle={{ width: "6rem", height: "6rem" }}
          titleStyle={{ fontSize: "1.8rem", fontWeight: "600" }}
          bioStyle={{
            fontSize: "1.4rem",
          }}
          addFriend={true}
          divider={true}
        />
        <PeopleCard
          imageStyle={{ width: "6rem", height: "6rem" }}
          titleStyle={{ fontSize: "1.8rem", fontWeight: "600" }}
          bioStyle={{
            fontSize: "1.4rem",
          }}
          addFriend={true}
          divider={true}
        />
        <PeopleCard
          imageStyle={{ width: "6rem", height: "6rem" }}
          titleStyle={{ fontSize: "1.8rem", fontWeight: "600" }}
          bioStyle={{
            fontSize: "1.4rem",
          }}
          addFriend={true}
          divider={true}
        />
        <PeopleCard
          imageStyle={{ width: "6rem", height: "6rem" }}
          titleStyle={{ fontSize: "1.8rem", fontWeight: "600" }}
          bioStyle={{
            fontSize: "1.4rem",
          }}
          addFriend={true}
          divider={true}
        />
        <PeopleCard
          imageStyle={{ width: "6rem", height: "6rem" }}
          titleStyle={{ fontSize: "1.8rem", fontWeight: "600" }}
          bioStyle={{
            fontSize: "1.4rem",
          }}
          addFriend={true}
          divider={true}
        />
      </Wrapper>
    </Box>
  );
};

export default PeoplePage;
