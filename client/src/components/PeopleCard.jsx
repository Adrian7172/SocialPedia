import { useTheme } from "@emotion/react";
import { PersonAdd } from "@mui/icons-material";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import Image from "mui-image";
import React from "react";
import CustDivider from "./CustDivider";
import FlexBetween from "./FlexBetween";

const PeopleCard = ({
  imageStyle,
  titleStyle,
  bioStyle,
  addFriend = false,
  divider,
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        p: "1rem",
      }}
    >
      <FlexBetween gap={2}>
        <Avatar src={`${require("../assets/cover.jpg")}`} sx={imageStyle} />
        <Box>
          <Typography variant="h5" sx={titleStyle}>
            Aman Chauhan
          </Typography>
          <Typography
            lineHeight={1.3}
            color={theme.palette.neutral.light}
            sx={bioStyle}
          >
            Lorem ipsum dolelit. Inventore, doloribus?
          </Typography>
        </Box>
        {addFriend && (
          <FlexBetween gap={2} width="30rem">
            <Button
              sx={{
                color: theme.palette.neutral.light,
                textTransform: "none",
                fontSize: "1.5rem",
              }}
            >
              ignore
            </Button>
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
              }}
            >
              Add friend
            </Button>
          </FlexBetween>
        )}
      </FlexBetween>
      {divider && <CustDivider />}
    </Box>
  );
};

export default PeopleCard;
