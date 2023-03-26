import {
  Avatar,
  Collapse,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import Image from "mui-image";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FlexBetween from "./FlexBetween";
import {
  useAddCommentMutation,
  useGetCommentLikeCommentQuery,
  useLikePostMutation,
  useRemoveLikePostMutation,
} from "state/api/postApi";
import styled from "@emotion/styled";
import { Form, FormikProvider, useFormik } from "formik";
import InputField from "./InputField";
import { Send } from "@mui/icons-material";
import CustDivider from "./CustDivider";

const CommentBox = ({ userId, comment, _id, reply = true }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const currUser = useSelector((state) => state.persistedReducer.user.userData);
  const token = useSelector((state) => state.persistedReducer.user.token);

  /* GET COMMENT'S LIKES AND COMMENT */
  const { data: getLikeAndComment } = useGetCommentLikeCommentQuery([
    token,
    _id,
  ]);

  const likes = getLikeAndComment?.likes;
  const comments = getLikeAndComment?.comments;

  /* IS COMMENT LIKED BY USER */
  const isCommentLiked = likes?.some((data) => {
    return data.userId._id === currUser?._id;
  });

  /* HANDLE LIKE */
  const [likePost] = useLikePostMutation();
  const [removeLike] = useRemoveLikePostMutation();

  async function handleCommentLike() {
    try {
      if (isCommentLiked) {
        await removeLike([
          token,
          {
            userId: currUser?._id,
            parentId: _id,
            parentType: "Comments",
          },
        ]);
      } else {
        await likePost([
          token,
          {
            userId: currUser?._id,
            parentId: _id,
            parentType: "Comments",
          },
        ]);
      }
    } catch (error) {
      const msg = error.response.data.message
        ? error.response.data.message
        : "Something went wrong!!!";
      toast(msg);
    }
  }
  /* BREAK POINTS */
  const tabScreen = useMediaQuery("(max-width:765px)");

  /* COMMENT (Formik)*/
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: async (values, { resetForm }) => {
      addComments(values, resetForm);
    },
  });

  /* ADD COMMENT */
  const [addComment] = useAddCommentMutation();
  async function addComments(values, resetForm) {
    try {
      await addComment([
        token,
        {
          userId: currUser?._id,
          parentId: _id,
          parentType: "Comments",
          comment: values.comment,
        },
      ]);
      resetForm();
    } catch (error) {
      const msg = error.response.data.message
        ? error.response.data.message
        : "Something went wrong!!!";
      toast(msg);
    }
  }

  return (
    <FlexBetween
      gap={1}
      sx={{
        width: "100%",
        px: "0.5rem",
        mb: "1rem",
      }}
    >
      <Avatar
        flex={2}
        src={userId?.profilePicture?.url}
        sx={{
          width: "3rem",
          height: "3rem",
          alignSelf: "flex-start",
          mt: "1rem",
        }}
      />
      <Box width display="flex" flexDirection="column">
        <Box
          flex={5}
          sx={{
            wordWrap: "break-word",
            width: "max-content",
            overflowWrap: "break-word",
            bgcolor: theme.palette.secondary.light,
            borderRadius: "1rem",
            py: "0.7rem",
            px: "1rem",
          }}
        >
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: tabScreen ? "1.3rem" : "1.4rem",
            }}
          >
            {userId?.fullName}
          </Typography>
          <Typography
            sx={{
              fontSize: tabScreen ? "1.2rem" : "1.35rem",
              lineHeight: "1.35rem",
            }}
          >
            {comment}
          </Typography>
        </Box>
        <Box
          sx={{
            ml: "1rem",
            display: "flex",
            gap: "1.5rem",
          }}
        >
          <Typography
            onClick={handleCommentLike}
            component="p"
            sx={{
              fontSize: tabScreen ? "1.1rem" : "1.1rem",
              color: isCommentLiked
                ? theme.palette.primary.main
                : theme.palette.neutral.main,
              "&:hover": {
                cursor: "pointer",
                color: theme.palette.primary.main,
                textDecoration: "underline",
              },
            }}
          >
            {isCommentLiked ? "Liked" : "Like"}
          </Typography>
          {reply && (
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <Typography
                component="p"
                sx={{
                  fontSize: tabScreen ? "1.05rem" : "1.1rem",
                  "&:hover": {
                    cursor: "pointer",
                    color: theme.palette.primary.main,
                    textDecoration: "underline",
                  },
                }}
              >
                Reply ({comments ? comments.length : 0})
              </Typography>
            </ExpandMore>
          )}
          <Typography
            component="p"
            sx={{
              fontSize: tabScreen ? "1.1rem" : "1.1rem",
              color:theme.palette.neutral.main,
              "&:hover": {
                cursor: "pointer",
                color: theme.palette.primary.main,
                textDecoration: "underline",
              },
            }}
          >
            Delete
          </Typography>
          <FlexBetween
            sx={{
              ml: "1rem",
              gap: "0.5rem",
            }}
          >
            <Image
              src={`${require("../assets/likes.png")}`}
              width={10}
              height={10}
            />
            <Typography
              sx={{
                fontSize: tabScreen ? "0.9rem" : "0.9rem",
              }}
            >
              {likes ? likes.length : 0} Likes
            </Typography>
          </FlexBetween>
        </Box>
        <Collapse
          in={expanded}
          timeout="auto"
          unmountOnExit
          sx={{
            pt: "1rem",
          }}
        >
          <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
              <FlexBetween gap={1}>
                <Avatar
                  src={currUser?.profilePicture?.url}
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
                  fontSize={"1rem"}
                  InputProps={{
                    style: { fontSize: tabScreen ? "1.25rem" : "1.35rem" },
                  }}
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
                    type="submit"
                    sx={{
                      color: theme.palette.primary.main,
                    }}
                  >
                    <Send />
                  </IconButton>
                </Tooltip>
              </FlexBetween>

              {/* Add EMOJIS */}

              {/* <FlexBetween>
                  <Tooltip title="Add emojis">
                    <IconButton
                      onClick={handleEmojisClick}
                      aria-describedby={id}
                      size="small"
                    >
                      <EmojiEmotions />
                    </IconButton>
                  </Tooltip>
                  <EmojiPoper
                    name="comment"
                    id={id}
                    openEmojis={openEmojis}
                    anchorEl={anchorEl}
                    handleEmojisClose={handleEmojisClose}
                  />
                </FlexBetween> */}
            </Form>
          </FormikProvider>
          <CustDivider />
          <Box
            sx={{
              width: "100%",
              mt: "2rem",
              ml: "1rem",
            }}
          >
            {comments?.map((data) => {
              return <CommentBox key={data._id} {...data} reply={false} />;
            })}
          </Box>
        </Collapse>
      </Box>
    </FlexBetween>
  );
};

export default CommentBox;

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <FlexBetween {...other} />;
})(({ theme, expand }) => ({}));
