import { useTheme } from "@emotion/react";
import {
  DarkMode,
  LightMode,
  Message,
  Notifications,
  Search,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "state/authSlice";
import AutoComplete from "./AutoComplete";
import FlexBetween from "./FlexBetween";

const Navbar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);

  const boxRef = useRef(null);
  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setOpenSearch(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [boxRef]);

  return (
    <FlexBetween
      border={1}
      height="5rem"
      borderColor={theme.palette.secondary.main}
      position="sticky"
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FlexBetween
          gap="2rem"
          sx={{
            width: "max-content",
          }}
        >
          <Typography
            fontWeight={700}
            fontSize={"2.1rem"}
            color={"primary"}
            mt="0.3rem"
          >
            SocialPedia
          </Typography>
          <Box
            ref={boxRef}
            position="relative"
            bgcolor={theme.palette.secondary.light}
            borderRadius="1rem"
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            {openSearch ? (
              <Box
                width="55rem"
                boxShadow={4}
                borderRadius="1rem"
                pl={1}
                position="absolute"
                bgcolor={theme.palette.secondary.light}
              >
                <AutoComplete />
              </Box>
            ) : (
              <Box
                onClick={() => setOpenSearch(true)}
                sx={{
                  // maxWidth: "35rem",
                  width: "30rem",
                  height: "100%",
                  cursor: "text",
                  p: "0 1rem",
                }}
              >
                <IconButton sx={{ pointerEvents: "none" }}>
                  <Search />
                </IconButton>
                <Typography variant="p" sx={{ pointerEvents: "none" }}>
                  Search...
                </Typography>
              </Box>
            )}
          </Box>
        </FlexBetween>
        <FlexBetween height="5rem" gap="1rem">
          <Box
            onClick={() => dispatch(setMode())}
            sx={{
              p: "0.8rem 1rem 0 1rem",
              cursor: "pointer",
            }}
          >
            {mode === "light" ? <DarkMode /> : <LightMode />}
          </Box>
          <Box
            sx={{
              p: "0.8rem 1rem 0 1rem",
              cursor: "pointer",
              // color: theme.palette.primary.main,
            }}
          >
            <Message />
          </Box>
          <Box
            sx={{
              p: "0.8rem 1rem 0 1rem",
              cursor: "pointer",
              // color: theme.palette.primary.main,
            }}
          >
            <Notifications />
          </Box>

          <Avatar sx={{ width: "3rem", height: "3rem", cursor: "pointer" }} />
        </FlexBetween>
      </Container>
    </FlexBetween>
  );
};

export default Navbar;
