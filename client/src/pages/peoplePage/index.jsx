import { useTheme } from "@emotion/react";
import {
  Box,
  Divider,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PeopleCard from "components/PeopleCard";
import Wrapper from "components/Wrapper";
import React from "react";
import { useSelector } from "react-redux";
import { useGetAllUserQuery } from "state/api/userApi";

const PeoplePage = () => {
  const token = useSelector((state) => state.persistedReducer.user.token);
  const currUser = useSelector((state) => state.persistedReducer.user.userData);

  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const verySmallScreen = useMediaQuery("(max-width: 320px)");
  
  const { data: allUserData, isLoading } = useGetAllUserQuery(token);

  const allUser = allUserData?.filter((data) => {
    return data?._id !== currUser?._id;
  });

  const skelton = Array.from({ length: 10 }, (_, index) => (
    <Box
      key={index}
      sx={{
        p: "1rem",
      }}
    >
      <Box display="flex" gap={2}>
        <Skeleton
          variant="circular"
          width="5rem"
          height="5rem"
          sx={{
            mb: "0.5rem",
          }}
        />{" "}
        <Box width="80%" mb="0.5rem">
          <Skeleton variant="text" sx={{ fontSize: "2rem", width: "50%" }} />
          <Skeleton variant="text" sx={{ fontSize: "2rem", width: "80%" }} />
        </Box>
      </Box>
      <Divider />
    </Box>
  ));

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
        {isLoading ? (
          <Box flexDirection="column" flex={5} pb="8rem">
            {skelton}
          </Box>
        ) : (
          allUser?.map((user) => {
            return (
              <PeopleCard
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
                }}
                bioStyle={{
                  fontSize: smallScreen
                    ? verySmallScreen
                      ? "1.1rem"
                      : "1.2rem"
                    : "1.3rem",
                }}
                addressStyle={{
                  mt: "0.5rem",
                  fontSize: "1.05rem",
                  color: theme.palette.neutral.light,
                }}
                user={user}
                addFriend={true}
                divider={true}
              />
            );
          })
        )}
      </Wrapper>
    </Box>
  );
};

export default PeoplePage;
