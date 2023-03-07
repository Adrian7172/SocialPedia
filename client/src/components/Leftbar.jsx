import { useTheme } from "@emotion/react";
import { Home, Message, Notifications, People } from "@mui/icons-material";
import {
  Avatar,
  Box,
  CardActions,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
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
    { id: "1", name: "Home", icon: `${home}`, navigate: "/" },
    { id: "2", name: "Messages", icon: `${messages}`, navigate: "/mesaages" },
    {
      id: "3",
      name: "Notifications",
      icon: `${notifications}`,
      navigate: "/notifications",
    },
    { id: "4", name: "Friends", icon: `${friends}`, navigate: "/friends" },
    { id: "5", name: "Groups", icon: `${groups}`, navigate: "/groups" },
    { id: "6", name: "Likes", icon: `${likes}`, navigate: "/likes" },
    {
      id: "7",
      name: "Saved posts",
      icon: `${savedPages}`,
      navigate: "/savedposts",
    },
    { id: "8", name: "Logout", icon: `${logout}`, navigate: "/login" },
  ];
  const MobNav = [
    {
      id: "1",
      IconComponent: (
        <Home
          sx={{
            width: "3rem",
            height: "3rem",
          }}
        />
      ),
      navigate: "/",
    },
    {
      id: "2",
      IconComponent: (
        <Message
          sx={{
            width: "3rem",
            height: "3rem",
          }}
        />
      ),
      navigate: "/messages",
    },
    {
      id: "3",
      IconComponent: (
        <Notifications
          sx={{
            width: "3rem",
            height: "3rem",
          }}
        />
      ),
      navigate: "/notifications",
    },
    {
      id: "4",
      IconComponent: (
        <People
          sx={{
            width: "3rem",
            height: "3rem",
          }}
        />
      ),
      navigate: "/friends",
    },
  ];

  const [active, setActive] = useState("1");
  const theme = useTheme();

  /*  BREAK POINTS */
  const tabScreen = useMediaQuery("(max-width:765px)");
  const smallScreen = useMediaQuery("(max-width:650px)");

  // useEffect
  const handleActive = (id) => {
    setActive(id);
  };

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
          <Wrapper width="100%" height="100%" overflow="auto" my="auto">
            <FlexBetween
              p="2rem 0"
              flexDirection="column"
              gap={tabScreen ? 3.5 : 2}
            >
              {Nav.map((comp) => (
                <NavComponent
                  active={active}
                  handleActive={handleActive}
                  {...comp}
                  key={comp.id}
                />
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
            {MobNav.map((comp) => (
              <NavComponent
                active={active}
                handleActive={handleActive}
                {...comp}
                key={comp.id}
              />
            ))}
          </CardActions>
        </Box>
      )}
    </>
  );
};

export default Leftbar;
