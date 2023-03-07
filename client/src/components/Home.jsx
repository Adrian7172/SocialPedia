import { useTheme } from "@emotion/react";
import { Box, Skeleton, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useGetAllPostQuery } from "state/api/postApi";
import AddPost from "./AddPost";
import UserPost from "./UserPost";
import Wrapper from "./Wrapper";

const Home = () => {
  const theme = useTheme();
  const token = useSelector((state) => state.persistedReducer.user.token);

  const {
    data: posts,
    isLoading,
  } = useGetAllPostQuery(token);

  /*  BREAK POINTS */
  const tabScreen = useMediaQuery("(max-width:765px)");
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const PostLoading = () => {
    return (
      <Box
        sx={{
          p: "1rem",
        }}
      >
        <Skeleton
          variant="circular"
          width="4.5rem"
          height="4.5rem"
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
      <AddPost />

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
        posts?.map((post) => {
          return <UserPost {...post} key={post._id} />;
        })
      )}
    </Box>
  );
};

export default Home;
