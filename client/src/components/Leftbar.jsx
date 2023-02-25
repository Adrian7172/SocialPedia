import { useTheme } from "@emotion/react";
import { Home } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
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
  return (
    <FlexBetween flexDirection="column" flexGrow={1}>
      <Wrapper width="100%">
        <FlexBetween p="2rem 0" flexDirection="column" gap={1}>
          {Nav.map((comp) => (
            <NavComponent {...comp} key={comp.icon} />
          ))}
        </FlexBetween>
      </Wrapper>

      {/* <Wrapper width="100%" p="2rem 1rem">
        <NavComponent name="Logout" icon={logout}></NavComponent>
      </Wrapper> */}
    </FlexBetween>
  );
};

export default Leftbar;
