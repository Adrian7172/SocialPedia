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
  Container,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "mui-image";
import logo from "../assets/logo2.png";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "state/authSlice";
import AutoComplete from "./AutoComplete";
import FlexBetween from "./FlexBetween";

const Navbar = () => {
  const boxRef = useRef(null);
  const [openSearch, setOpenSearch] = useState(false);

  const theme = useTheme();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.persistedReducer.mode);

  /*  BREAK POINTS */
  const tabScreen = useMediaQuery("(max-width:765px)");
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const verySmallScreen = useMediaQuery("(max-width: 320px)");

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
      top={0}
      bgcolor={theme.palette.background.default}
      zIndex={100}
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
          {smallScreen ? (
            <Image
              src={logo}
              width="5rem"
              height="5rem"
              sx={{
                ml: "1rem",
              }}
            />
          ) : (
            <Typography
              fontWeight={700}
              fontSize={"2.1rem"}
              color={"primary"}
              mt="0.3rem"
            >
              SocialPedia
            </Typography>
          )}
          <Box
            ref={boxRef}
            position="relative"
            bgcolor={verySmallScreen ? null : theme.palette.secondary.light}
            borderRadius="1rem"
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            {openSearch ? (
              <Box
                width={tabScreen ? "100%" : "55rem"}
                boxShadow={4}
                borderRadius="1rem"
                pl={1}
                position={tabScreen ? "fixed" : "absolute"}
                zIndex={100}
                left={tabScreen && 0}
                right={tabScreen && 0}
                bgcolor={theme.palette.secondary.light}
              >
                <AutoComplete />
              </Box>
            ) : (
              <>
                <Box
                  onClick={() => setOpenSearch(true)}
                  sx={{
                    maxWidth: "30rem",
                    width: smallScreen ? "100%" : "35rem",
                    height: "100%",
                    cursor: "text",
                    p: "0 1rem",
                  }}
                >
                  <IconButton
                    sx={{
                      pointerEvents: "none",
                      background:
                        verySmallScreen && theme.palette.secondary.light,
                    }}
                  >
                    <Search />
                  </IconButton>
                  {!verySmallScreen && (
                    <Typography variant="p" sx={{ pointerEvents: "none" }}>
                      Search...
                    </Typography>
                  )}
                </Box>
              </>
            )}
          </Box>
        </FlexBetween>
        <FlexBetween height="5rem" gap="1.2rem">
          <IconButton
            onClick={() => dispatch(setMode())}
            sx={{
              cursor: "pointer",
            }}
          >
            {mode === "light" ? <DarkMode /> : <LightMode />}
          </IconButton>
          <IconButton
            sx={{
              cursor: "pointer",
              display: tabScreen ? "none" : "flex",
            }}
          >
            <Message />
          </IconButton>
          <IconButton
            sx={{
              cursor: "pointer",
              display: tabScreen ? "none" : "flex",
            }}
          >
            <Notifications />
          </IconButton>

          <Avatar sx={{ width: "3rem", height: "3rem", cursor: "pointer" }} />
        </FlexBetween>
      </Container>
    </FlexBetween>
  );
};

export default Navbar;
