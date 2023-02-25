import { useTheme } from "@emotion/react";
import { Avatar, Box, TextField } from "@mui/material";
import React from "react";
import CustDivider from "./CustDivider";
import FlexBetween from "./FlexBetween";
import Wrapper from "./Wrapper";

const Home = () => {
  const theme = useTheme();
  return (
    <FlexBetween flexDirection="column" flexGrow={3}>
      <Wrapper
        width="100%"
        display="flex"
        alignItems="center"
        gap={2}
        height="max-content"
      >
        <Box
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
          <Box>Emojis</Box>
        </Box>
      </Wrapper>
    </FlexBetween>
  );
};

export default Home;
