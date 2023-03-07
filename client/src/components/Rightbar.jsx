import React from "react";
import { useTheme } from "@emotion/react";
import {
  Avatar,
  Box,
  Divider,
  Link,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "mui-image";
import FlexBetween from "./FlexBetween";
import Wrapper from "./Wrapper";
import cover from "../assets/cover.jpg";
import PeopleCard from "./PeopleCard";
import { useSelector } from "react-redux";
import { useGetAllUserQuery } from "state/api/userApi";

function Rightbar() {
  const theme = useTheme();
  const user = useSelector((state) => state.persistedReducer.user.userData);
  const token = useSelector((state) => state.persistedReducer.user.token);

  const { data: allUser, isLoading } = useGetAllUserQuery(token);
  const users = allUser?.slice(0, 3);
  const mediumScreen = useMediaQuery("(max-width: 1000px)");

  // skelton
  const skelton = Array.from({ length: 3 }, (_, index) => (
    <Box
      key={index}
      sx={{
        p: "1rem",
      }}
    >
      <Box display="flex" gap={2}>
        <Skeleton
          variant="circular"
          width="3.5rem"
          height="3.5rem"
          sx={{
            mb: "0.5rem",
          }}
        />{" "}
        <Box width="60%">
          <Skeleton variant="text" sx={{ fontSize: "1.5rem", width: "60%" }} />
        </Box>
      </Box>
      <Skeleton variant="text" sx={{ fontSize: "1.5rem", width: "100%" }} />
    </Box>
  ));
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
              src={user?.profilePicture}
              sx={{
                border: "0.25rem solid",
                borderColor: theme.palette.background.default,
                mt: "-3.5rem",
                width: "7rem",
                height: "7rem",
              }}
            />
          </FlexBetween>
          <FlexBetween flexDirection="column" mb={2}>
            <Link
              href={`/profile/${user?._id}`}
              variant="p"
              sx={{
                my: "0.5rem",
                fontWeight: "500",
                color: theme.palette.neutral.main,
                textDecoration: "none",
                "&:hover": {
                  color: theme.palette.primary.main,
                  cursor: "pointer",
                  textDecoration: "underline",
                },
              }}
            >
              {user?.fullName}
            </Link>
            <Divider width="100%" />
            <Typography
              lineHeight={1.3}
              color={theme.palette.neutral.light}
              sx={{
                my: "1rem",
                fontSize: "1.1rem",
                textAlign: "center",
              }}
            >
              {user?.bio}
            </Typography>
            <Divider width="100%" />
            <Box
              width="70%"
              pt="1rem"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: theme.palette.neutral.main,
                }}
              >
                views{" "}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: theme.palette.neutral.light,
                }}
              >
                2270{" "}
              </Typography>
            </Box>
            <Box
              width="70%"
              pt="1rem"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: theme.palette.neutral.main,
                }}
              >
                friends{" "}
              </Typography>
              <Link>
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: theme.palette.neutral.main,
                    cursor: "pointer",
                    "&:hover": {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  70{" "}
                </Typography>
              </Link>
            </Box>
          </FlexBetween>
        </Box>
        <Wrapper>
          <Box margin="0.8rem">
            <Typography
              variant="h5"
              color={theme.palette.neutral.light}
              sx={{
                fontSize: "1.3rem",
              }}
            >
              Recomendation for you
            </Typography>
          </Box>
          {isLoading ? (
            <Box flexDirection="column" flex={5} pb="8rem">
              {skelton}
            </Box>
          ) : (
            users?.map((user) => {
              return (
                <PeopleCard
                  imageStyle={{ width: "3.5rem", height: "3.5rem" }}
                  titleStyle={{ fontSize: "1.4rem", fontWeight: "600" }}
                  bioStyle={{
                    fontSize: "1.1rem",
                  }}
                  addressStyle={{
                    mt: "0.2rem",
                    fontSize: "0.9rem",
                    color: theme.palette.neutral.light,
                  }}
                  user={user}
                />
              );
            })
          )}

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
        {/* <Wrapper>
          <Box margin="0.8rem">
            <Typography
              variant="h5"
              color={theme.palette.neutral.light}
              sx={{
                fontSize: "1.3rem",
              }}
            >
              Friends
            </Typography>
          </Box>
          <PeopleCard
            imageStyle={{ width: "3.5rem", height: "3.5rem" }}
            titleStyle={{ fontSize: "1.3rem", fontWeight: "600" }}
            bioStyle={{
              fontSize: "1.02rem",
            }}
          />
          <PeopleCard
            imageStyle={{ width: "3.5rem", height: "3.5rem" }}
            titleStyle={{ fontSize: "1.3rem", fontWeight: "600" }}
            bioStyle={{
              fontSize: "1.02rem",
            }}
          />
          <PeopleCard
            imageStyle={{ width: "3.5rem", height: "3.5rem" }}
            titleStyle={{ fontSize: "1.3rem", fontWeight: "600" }}
            bioStyle={{
              fontSize: "1.02rem",
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
        </Wrapper> */}
      </Box>
    </>
  );
}

export default Rightbar;
