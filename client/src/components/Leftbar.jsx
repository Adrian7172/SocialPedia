import { useTheme } from "@emotion/react";
import { Home, Message, Notifications, People } from "@mui/icons-material";
import {
  Avatar,
  Box,
  CardActions,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import FlexBetween from "./FlexBetween";
import NavComponent from "./NavComponent";
import Wrapper from "./Wrapper";
import home from "../assets/house.png";
import messages from "../assets/messages.png";
import friends from "../assets/friendship.png";
import groups from "../assets/groups.png";
import notifications from "../assets/notification.png";
import savedPages from "../assets/savedPages.png";
import likes from "../assets/likes.png";
import logout from "../assets/check-out.png";

const Leftbar = () => {
  const Nav = [
    { name: "Home", icon: `${home}` },
    { name: "Messages", icon: `${messages}` },
    { name: "Notifications", icon: `${notifications}` },
    { name: "Friends", icon: `${friends}` },
    { name: "Groups", icon: `${groups}` },
    { name: "Likes", icon: `${likes}` },
    { name: "Saved posts", icon: `${savedPages}` },
    { name: "Logout", icon: `${logout}` },
  ];
  const theme = useTheme();

  /*  BREAK POINTS */
  const tabScreen = useMediaQuery("(max-width:765px)");
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {!smallScreen ? (
        <Box
          display={smallScreen ? "none" : "flex"}
          flexDirection="column"
          flex={tabScreen ? 1 : 2}
          sx={{
            position: "sticky",
            top: "6.1rem",
            overflowY: "scroll",
            maxHeight: tabScreen ? "70rem" : "60rem",
            height: "calc(100vh - 6.1rem)",

            "&::-webkit-scrollbar": {
              display: "none",
            },
            "&::-moz-scrollbar": {
              display: "none",
            },
          }}
        >
          <Wrapper width="100%" height="100%"
          overflow="auto" my="auto"
          >
            <FlexBetween p="2rem 0" flexDirection="column" gap={tabScreen ? 3.5 : 2}>
              {Nav.map((comp) => (
                <NavComponent {...comp} key={comp.icon} />
              ))}
            </FlexBetween>
          </Wrapper>
        </Box>
      ) : (
        <Box
          boxShadow={5}
          sx={{
            bgcolor: theme.palette.background.default,
            position: "fixed",
            bottom: "0",
            left: "0",
            right: "0",
            zIndex: "100",
            width: "100%",
          }}
        >
          <CardActions
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <IconButton size="small">
              <Home
                sx={{
                  width: "3rem",
                  height: "3rem",
                  color: theme.palette.primary.main,
                }}
              />
            </IconButton>
            <IconButton size="small">
              <Message
                sx={{
                  width: "3rem",
                  height: "3rem",
                }}
              />
            </IconButton>
            <IconButton size="small">
              <Notifications
                sx={{
                  width: "3rem",
                  height: "3rem",
                }}
              />
            </IconButton>
            <IconButton size="small">
              <People
                sx={{
                  width: "3rem",
                  height: "3rem",
                }}
              />
            </IconButton>
          </CardActions>
        </Box>
      )}
    </>
  );
};

export default Leftbar;
