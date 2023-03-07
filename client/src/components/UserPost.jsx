import React from "react";
import { useTheme } from "@emotion/react";
import {
  BookmarkBorderOutlined,
  ChatBubbleOutline,
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

const UserPost = ({ imageId, postId }) => {
  // user data
  const user = postId?.userId;

  //post time
  const createdAt = new Date(postId?.createdAt);
  const date = formatDistanceToNow(createdAt, { addSuffix: true });

  const theme = useTheme();

  /*  BREAK POINTS */
  const tabScreen = useMediaQuery("(max-width:765px)");
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const verySmallScreen = useMediaQuery("(max-width: 320px)");

  return (
    <Wrapper width="100%">
      <Box mx="auto">
        <Box p={smallScreen ? "1rem 0" : "1rem"}>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" gap={2} alignItems="center">
              <Avatar
                src={user?.profilePicture?.imageData}
                sx={{
                  width: "4.5rem",
                  height: "4.5rem",
                  alignSelf: "flex-start",
                }}
              />
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: "1.55rem",
                    fontWeight: "600",
                  }}
                >
                  {user?.fullName}
                </Typography>
                <Typography
                  sx={{
                    fontSize: tabScreen ? "1.1rem" : "1.2rem",
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
                fontSize: tabScreen
                ? smallScreen
                  ? "1.2rem"
                  : "1.3rem"
                : "1.5rem",
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
              <IconButton aria-label="add to favorites">
                <FavoriteBorderOutlined />
              </IconButton>
              <Typography
                sx={{
                  fontSize: tabScreen ? "1.1rem" : "1.2rem",
                  cursor: "pointer",
                  color: theme.palette.neutral.light,
                }}
              >
                12 likes
              </Typography>
            </FlexBetween>
            <FlexBetween>
              <IconButton aria-label="add to favorites">
                <ChatBubbleOutline
                />
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
