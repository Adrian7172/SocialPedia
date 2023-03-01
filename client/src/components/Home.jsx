import { useTheme } from "@emotion/react";
import { EmojiEmotions, GifBox, PermMedia } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import CustDivider from "./CustDivider";
import FlexBetween from "./FlexBetween";
import UserPost from "./UserPost";
import Wrapper from "./Wrapper";

const Home = () => {
  const theme = useTheme();

  /*  BREAK POINTS */
  const tabScreen = useMediaQuery("(max-width:765px)");
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box flexDirection="column" flex={5} pb="8rem">
      <Wrapper
        width="100%"
        display="flex"
        alignItems="center"
        gap={2}
        height="max-content"
      >
        <Box
          display={smallScreen ? "none" : "flex"}
          flex={1}
          alignSelf="flex-start"
          sx={{
            ml: "1rem",
            height: "100%",
            p: "1rem 0",
          }}
        >
          <Avatar
            sx={{
              width: "5.5rem",
              height: "5.5rem",
            }}
          />
        </Box>
        <Box
          flex={8}
          alignSelf="flex-start"
          mt=".5rem"
          sx={{
            width: "max-content",
          }}
        >
          <Box
            width="100%"
            height="max-content"
            sx={{
              border: "0",
              borderRadius: "1.5rem",
              background: theme.palette.secondary.light,
            }}
          >
            <TextField
              type="text"
              size="large"
              multiline
              placeholder="What's going on in your mind?"
              sx={{
                width: "100%",
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
          </Box>
          <CustDivider></CustDivider>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <IconButton
              sx={{
                bgcolor: !tabScreen && theme.palette.secondary.light,
                borderRadius: !tabScreen ? "2rem" : "3rem",
                padding: !tabScreen ? "0.7rem 1.5rem" : "1rem",
                gap: !tabScreen && "0.5rem",
                color: theme.palette.neutral.light,
              }}
            >
              <PermMedia />
              <Typography
                sx={{
                  display: tabScreen ? "none" : "block",
                  fontSize: "1.4rem",
                  color: theme.palette.neutral.light,
                }}
              >
                image
              </Typography>
            </IconButton>
            <IconButton
              sx={{
                bgcolor: !tabScreen && theme.palette.secondary.light,
                borderRadius: !tabScreen ? "2rem" : "3rem",
                padding: !tabScreen ? "0.7rem 1.5rem" : "1rem",
                gap: !tabScreen && "0.5rem",
                color: theme.palette.neutral.light,
              }}
            >
              <GifBox />
              <Typography
                sx={{
                  fontSize: "1.4rem",
                  color: theme.palette.neutral.light,
                  display: tabScreen ? "none" : "block",
                }}
              >
                GIF
              </Typography>
            </IconButton>
            <IconButton
              sx={{
                bgcolor: !tabScreen && theme.palette.secondary.light,
                borderRadius: !tabScreen ? "2rem" : "3rem",
                padding: !tabScreen ? "0.7rem 1.5rem" : "1rem",
                gap: !tabScreen && "0.5rem",
                color: theme.palette.neutral.light,
              }}
            >
              <EmojiEmotions />
              <Typography
                sx={{
                  fontSize: "1.4rem",
                  color: theme.palette.neutral.light,
                  display: tabScreen ? "none" : "block",
                }}
              >
                Emojis
              </Typography>
            </IconButton>

            <Button
              variant="contained"
              size="medium"
              sx={{
                mt: tabScreen ? "0.5rem" : "0.2rem",
                height: "3.3rem",
                padding: "0 2rem",
                borderRadius: "2rem",
              }}
            >
              Post
            </Button>
          </Box>
        </Box>
      </Wrapper>
      <UserPost />
      <UserPost />
      <UserPost />
      <UserPost />
    </Box>
  );
};

export default Home;
