import { useTheme } from "@emotion/react";
import { Favorite, Share } from "@mui/icons-material";
import {
  Avatar,
  Box,
  CardActions,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "mui-image";
import React from "react";
import Wrapper from "./Wrapper";

const UserPost = () => {
  const theme = useTheme();

  /*  BREAK POINTS */
  const tabScreen = useMediaQuery("(max-width:765px)");
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Wrapper width="100%">
      <Box mx="auto">
        <Box p={smallScreen ? "1rem 0" : "1rem"}>
          <Box display="flex" gap={2} alignItems="center">
            <Avatar
              sx={{
                alignSelf: "flex-start",
              }}
            />
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                }}
              >
                Aman Chauhan
              </Typography>
              <Typography
                sx={{
                  fontSize: tabScreen ? "1rem" : "1.1rem",
                  color: theme.palette.neutral.light,
                }}
              >
                one hour ago
              </Typography>
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
                    ? "1.1rem"
                    : "1.2rem"
                  : "1.3rem",
                color: theme.palette.neutral.main,
              }}
            >
              Lorem ipsum dolor sit amet Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem, id.
            </Typography>
          </Box>
          <Box
            sx={{
              maxWidth: smallScreen ? "60rem" : "100%",
              height: tabScreen ? (smallScreen ? "24rem" : "30rem") : "35rem",
            }}
          >
            <Image
              src={`${require("../assets/cover.jpg")}`}
              width="100%"
              height="100%"
              sx={{
                borderRadius: "1rem",
              }}
            />
          </Box>
          <CardActions
            sx={{
              mt: "1.5rem",
              p: "0 1rem",
            }}
          >
            <IconButton aria-label="add to favorites" color="red">
              <Favorite />
            </IconButton>
            <IconButton aria-label="share">
              <Share />
            </IconButton>
          </CardActions>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default UserPost;
