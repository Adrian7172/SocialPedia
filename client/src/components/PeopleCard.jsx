import { useTheme } from "@emotion/react";
import { Avatar, Box, Button, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import CustDivider from "./CustDivider";
import FlexBetween from "./FlexBetween";

const PeopleCard = ({
  imageStyle,
  titleStyle,
  bioStyle,
  addressStyle,
  addFriend = false,
  divider,
  user = null,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const fullName = user?.fullName;
  const bio = trucateString(user?.bio);
  const address = `${user?.address?.state}, ${user?.address?.country}`;
  const profilePicture = user?.profilePicture?.imageData;
  return (
    <Box
      sx={{
        width: "100%",
        p: smallScreen ? "0.4rem" : "1rem",
      }}
    >
      <Box
        display="flex"
        gap={2}
        onClick={() => {
          navigate(`/profile/${user?._id}`);
        }}
        sx={{
          cursor: "pointer",
        }}
      >
        <Avatar src={profilePicture} sx={imageStyle} />
        <Box>
          <Typography variant="h5" sx={titleStyle}>
            {fullName}
          </Typography>
          <Typography
            lineHeight={1.3}
            color={theme.palette.neutral.light}
            sx={bioStyle}
          >
            {bio}
          </Typography>
          <Typography lineHeight={1.3} sx={addressStyle}>
            {address}
          </Typography>
        </Box>
        {addFriend && (
          <FlexBetween gap={2} width="max-content" ml="auto">
            {!smallScreen && (
              <Button
                sx={{
                  color: theme.palette.neutral.light,
                  textTransform: "none",
                  fontSize: "1.5rem",
                }}
              >
                ignore
              </Button>
            )}
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                whiteSpace: "nowrap",
                fontSize: smallScreen ? "1.2rem" : "1.5rem",
                p: "0.4rem 0.6rem",
              }}
            >
              Add friend
            </Button>
          </FlexBetween>
        )}
      </Box>
      {divider && <CustDivider />}
    </Box>
  );
};

export default PeopleCard;

function trucateString(str) {
  if (str?.length > 40) {
    str = str.slice(0, 37) + "...";
  }
  return str;
}
