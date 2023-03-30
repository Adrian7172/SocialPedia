import { Box, Skeleton, useMediaQuery } from "@mui/material";
import UserPost from "components/UserPost";
import Wrapper from "components/Wrapper";
import React from "react";
import { useSelector } from "react-redux";
import { useGetUserLikesQuery } from "state/api/postApi";

const LikesPage = () => {
  const token = useSelector((state) => state.persistedReducer.user.token);
  const user = useSelector((state) => state.persistedReducer.user.userData);

  const { data: userLikedPost, isLoading } = useGetUserLikesQuery([
    token,
    user._id,
  ]);

  /*  BREAK POINTS */
  const tabScreen = useMediaQuery("(max-width:765px)");
  const smallScreen = useMediaQuery("(max-width: 550px)");

  const PostLoading = () => {
    return (
      <Box
        sx={{
          p: "1rem",
        }}
      >
        <Skeleton
          variant="circular"
          width="4rem"
          height="4rem"
          sx={{
            mb: "1rem",
          }}
        />
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
        <Skeleton
          variant="rectangular"
          sx={{
            marginTop: "2rem",
            marginBottom: "1rem",
            maxWidth: smallScreen ? "60rem" : "100%",
            height: tabScreen ? (smallScreen ? "24rem" : "30rem") : "35rem",
            borderRadius: "2rem",
          }}
        />
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
      </Box>
    );
  };

  return (
    <Box flexDirection="column" flex={5} pb="8rem">
      {isLoading ? (
        <Box>
          <Wrapper>
            <PostLoading />
          </Wrapper>
          <Wrapper>
            <PostLoading />
          </Wrapper>
          <Wrapper>
            <PostLoading />
          </Wrapper>
        </Box>
      ) : (
        userLikedPost?.map((post) => {
          return <UserPost {...post.parent} key={post._id} />;
        })
      )}
    </Box>
  );
};

export default LikesPage;
