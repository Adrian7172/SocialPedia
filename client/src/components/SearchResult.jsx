import { useTheme } from "@emotion/react";
import { Box, Skeleton, useMediaQuery } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetSearchedUsersQuery } from "state/api/userApi";
import CustDivider from "./CustDivider";
import PeopleCard from "./PeopleCard";
import Wrapper from "./Wrapper";

const SearchResult = () => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const verySmallScreen = useMediaQuery("(max-width: 320px)");

  const token = useSelector((state) => state.persistedReducer.user.token);
  const currUser = useSelector((state) => state.persistedReducer.user.userData);

  const name = useParams();
  const { data: searched, isLoading } = useGetSearchedUsersQuery([
    token,
    name.name,
  ]);

  const searchedUsers = searched?.filter((data) => {
    return data?._id !== currUser?._id;
  });

  // skelton
  const skelton = Array.from({ length: 5 }, (_, index) => (
    <Box
      key={index}
      sx={{
        mb: "3rem",
        p: "1rem",
      }}
    >
      <Box display="flex" gap={2}>
        <Skeleton
          variant="circular"
          width="5rem"
          height="5rem"
          sx={{
            mb: "1rem",
          }}
        />{" "}
        <Box width="80%">
          <Skeleton variant="text" sx={{ fontSize: "2rem", width: "50%" }} />
        </Box>
      </Box>
      <Skeleton
        variant="text"
        sx={{ fontSize: "2rem", width: "100%", mb: "2rem" }}
      />
      <CustDivider />
    </Box>
  ));

  return (
    <>
      {isLoading ? (
        <Box flexDirection="column" flex={5} pb="8rem">
          <Wrapper>{skelton}</Wrapper>
        </Box>
      ) : searchedUsers?.length === 0 ? (
        <Box flexDirection="column" flex={5} pb="8rem">
          <Wrapper>No result</Wrapper>
        </Box>
      ) : (
        <Box flexDirection="column" flex={5} pb="8rem">
          <Wrapper>
            {searchedUsers?.map((user) => {
              return (
                <PeopleCard
                  key={user?._id}
                  imageStyle={{
                    width: smallScreen
                      ? verySmallScreen
                        ? "4rem"
                        : "4.5rem"
                      : "5.5rem",
                    height: smallScreen
                      ? verySmallScreen
                        ? "4rem"
                        : "4.5rem"
                      : "5.5rem",
                  }}
                  titleStyle={{
                    fontSize: smallScreen
                      ? verySmallScreen
                        ? "1.3rem"
                        : "1.5rem"
                      : "1.7rem",
                    fontWeight: "600",
                    mb: "0.5rem",
                  }}
                  bioStyle={{
                    fontSize: smallScreen
                      ? verySmallScreen
                        ? "1.1rem"
                        : "1.2rem"
                      : "1.3rem",
                  }}
                  addressStyle={{
                    mt: "0.2rem",
                    fontSize: "1.05rem",
                    color: theme.palette.neutral.light,
                  }}
                  user={user}
                  addFriend={true}
                  divider={true}
                />
              );
            })}
          </Wrapper>
        </Box>
      )}
    </>
  );
};

export default SearchResult;
