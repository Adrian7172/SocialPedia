import React, { useEffect } from "react";
import { useTheme } from "@emotion/react";
import {
  BookmarkBorderOutlined,
  ChatBubbleOutline,
  EmojiEmotions,
  Favorite,
  FavoriteBorder,
  FavoriteBorderOutlined,
  MoreHoriz,
  Send,
  Share,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  styled,
  TextField,
  Tooltip,
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
import InputField from "./InputField";
import AddPost from "./AddPost";
import { Form, FormikProvider, useFormik } from "formik";
import CustDivider from "./CustDivider";

const UserPost = ({ imageId, postId }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
  const { data: likesAndComments } = useGetPostLikeCommentQuery([
    token,
    postId?._id,
  ]);

  const likes = likesAndComments?.likes;
  const comments = likesAndComments?.comments;
  console.log(likesAndComments)
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

  /* COMMENT (Formik)*/
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: async (values, { resetForm }) => {},
  });

  /* COMMENT BOX */
  const CommentBox = ({ user, comment }) => {
    return (
      <FlexBetween>
        <Avatar
          flex={2}
          src={user?.profilePicture}
          sx={{
            width: "3rem",
            height: "3rem",
          }}
        />
        <Box flex={5}>
          <Typography>{user?.fullName}</Typography>
          <Typography>{comment}</Typography>
        </Box>
      </FlexBetween>
    );
  };

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
                fontSize: tabScreen ? "1.45rem" : "1.55rem",
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
                  fontSize: tabScreen ? "1.2rem" : "1.3rem",
                  cursor: "pointer",
                  color: theme.palette.neutral.light,
                }}
              >
                {likes?.length} likes
              </Typography>
            </FlexBetween>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <IconButton aria-label="add to favorites">
                <ChatBubbleOutline />
              </IconButton>
              <Typography
                sx={{
                  fontSize: tabScreen ? "1.2rem" : "1.3rem",
                  cursor: "pointer",
                  color: theme.palette.neutral.light,
                }}
              >
                {comments?.length} comments
              </Typography>
            </ExpandMore>
            <FlexBetween>
              <IconButton aria-label="add to favorites">
                <Share />
              </IconButton>
              <Typography
                sx={{
                  fontSize: tabScreen ? "1.2rem" : "1.3rem",
                  cursor: "pointer",
                  color: theme.palette.neutral.light,
                }}
              >
                Share
              </Typography>
            </FlexBetween>
          </CardActions>
          <Collapse
            in={expanded}
            timeout="auto"
            unmountOnExit
            sx={{
              pt: "3rem",
            }}
          >
            <FormikProvider value={formik}>
              <Form onSubmit={formik.handleSubmit}>
                <FlexBetween gap={1}>
                  <Avatar
                    src={currUser?.profilePicture}
                    sx={{
                      width: "3rem",
                      height: "3rem",
                    }}
                  />
                  <InputField
                    name="comment"
                    type="text"
                    size="small"
                    multiline
                    rows={0}
                    placeholder="Add Comment"
                    sx={{
                      width: "100%",
                      bgcolor: theme.palette.secondary.light,
                      borderRadius: "1rem",

                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "transparent",
                          borderWidth: 0,
                          outline: 0,
                        },
                      "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "transparent",
                        },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent",
                      },
                    }}
                  />
                  <Tooltip title="post">
                    <IconButton
                      sx={{
                        color: theme.palette.primary.main,
                      }}
                    >
                      <Send />
                    </IconButton>
                  </Tooltip>
                </FlexBetween>
              </Form>
            </FormikProvider>
            <CustDivider />

            <CommentBox />
          </Collapse>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default UserPost;

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <FlexBetween {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
}));
