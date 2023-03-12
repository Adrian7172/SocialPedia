import React, { useEffect } from "react";
import { useTheme } from "@emotion/react";
import {
  BookmarkBorderOutlined,
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
  FavoriteBorderOutlined,
  MoreHoriz,
  Share,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  CardActions,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "mui-image";
import Wrapper from "./Wrapper";
import { formatDistanceToNow } from "date-fns";
import FlexBetween from "./FlexBetween";
import { useNavigate } from "react-router-dom";
import {
  useGetPostLikeCommentQuery,
  useLikePostMutation,
  useRemoveLikePostMutation,
} from "state/api/postApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UserPost = ({ imageId, postId }) => {
  const currUser = useSelector((state) => state.persistedReducer.user.userData);
  const token = useSelector((state) => state.persistedReducer.user.token);

  // user data
  const user = postId?.userId;

  //post time
  const createdAt = new Date(postId?.createdAt);
  const date = formatDistanceToNow(createdAt, { addSuffix: true });

  const theme = useTheme();
  const navigate = useNavigate();

  /*  BREAK POINTS */
  const tabScreen = useMediaQuery("(max-width:765px)");
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const verySmallScreen = useMediaQuery("(max-width: 320px)");

  /* GET LIKES AND COMMENTS */
  const { data: likesAndComments, isLoading } = useGetPostLikeCommentQuery([
    token,
    postId?._id,
  ]);

  const likes = likesAndComments?.likes;
  const comments = likesAndComments?.comments;

  /* IS POST LIKED BY USER */
  const isLiked = likes?.some((data) => {
    return data.userId === currUser?._id;
  });

  /* HANDLE LIKE */
  const [likePost] = useLikePostMutation();
  const [removeLike] = useRemoveLikePostMutation();
  async function handleLike() {
    try {
      if (isLiked) {
        await removeLike([
          token,
          { userId: currUser?._id, postId: postId?._id },
        ]);
      } else {
        await likePost([token, { userId: currUser?._id, postId: postId?._id }]);
      }
    } catch (error) {
      const msg = error.response.data.message
        ? error.response.data.message
        : "Something went wrong!!!";
      toast(msg);
    }
  }

  /* HANDLE COMMENT CLICK */
  function handleComment() {}

  return (
    <Wrapper width="100%">
      <Box mx="auto">
        <Box p={smallScreen ? "1rem 0" : "1rem"}>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" gap={2} alignItems="center">
              <Avatar
                onClick={() => navigate(`/profile/${user?._id}`)}
                src={user?.profilePicture?.imageData}
                sx={{
                  width: "4.5rem",
                  height: "4.5rem",
                  alignSelf: "flex-start",
                }}
              />
              <Box>
                <Typography
                  onClick={() => navigate(`/profile/${user?._id}`)}
                  variant="h5"
                  sx={{
                    cursor: "pointer",
                    fontSize: "1.55rem",
                    fontWeight: "600",
                  }}
                >
                  {user?.fullName}
                </Typography>
                <Typography
                  sx={{
                    fontSize: tabScreen ? "1.05rem" : "1.2rem",
                    color: theme.palette.neutral.light,
                  }}
                >
                  {date}
                </Typography>
              </Box>
            </Box>
            <Box>
              <IconButton>
                <BookmarkBorderOutlined />
              </IconButton>
              <IconButton>
                <MoreHoriz />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              margin: "1.5rem 1rem 1rem 1rem",
            }}
          >
            <Typography
              sx={{
                fontSize: tabScreen ? "1.4rem" : "1.5rem",
                color: theme.palette.neutral.main,
              }}
            >
              {postId?.postCaption}
            </Typography>
          </Box>

          {imageId?.imageData && (
            <Box
              sx={{
                maxWidth: smallScreen ? "60rem" : "100%",
                height: tabScreen ? (smallScreen ? "24rem" : "30rem") : "40rem",
              }}
            >
              <Image
                src={imageId?.imageData}
                width="100%"
                height="100%"
                sx={{
                  borderRadius: "1rem",
                }}
              />
            </Box>
          )}
          <CardActions
            sx={{
              mt: "1.5rem",
              p: "0 1rem",
            }}
          >
            <FlexBetween>
              <IconButton aria-label="add to favorites" onClick={handleLike}>
                {isLiked ? (
                  <Favorite sx={{ color: "red" }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography
                sx={{
                  fontSize: tabScreen ? "1.15rem" : "1.25rem",
                  cursor: "pointer",
                  color: theme.palette.neutral.light,
                }}
              >
                {likes?.length} likes
              </Typography>
            </FlexBetween>
            <FlexBetween>
              <IconButton aria-label="add to favorites" onClick={handleComment}>
                <ChatBubbleOutline />
              </IconButton>
              <Typography
                sx={{
                  fontSize: tabScreen ? "1.1rem" : "1.2rem",
                  cursor: "pointer",
                  color: theme.palette.neutral.light,
                }}
              >
                12 comments
              </Typography>
            </FlexBetween>
            <FlexBetween>
              <IconButton aria-label="add to favorites">
                <Share />
              </IconButton>
              <Typography
                sx={{
                  fontSize: tabScreen ? "1.1rem" : "1.2rem",
                  cursor: "pointer",
                  color: theme.palette.neutral.light,
                }}
              >
                Share
              </Typography>
            </FlexBetween>
          </CardActions>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default UserPost;
