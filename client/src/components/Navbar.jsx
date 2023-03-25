import { useTheme } from "@emotion/react";
import {
  DarkMode,
  LightMode,
  Logout,
  Message,
  Notifications,
  Search,
  Settings,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "mui-image";
import logo from "../assets/logo2.png";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setMode } from "state/authSlice";
import AutoComplete from "./AutoComplete";
import FlexBetween from "./FlexBetween";
import { useGetAllUserQuery } from "state/api/userApi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const boxRef = useRef(null);
  const [openSearch, setOpenSearch] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.persistedReducer.user.mode);
  const token = useSelector((state) => state.persistedReducer.user.token);
  const user = useSelector((state) => state.persistedReducer.user.userData);

  /* get all user for search */
  const { data: allUser } = useGetAllUserQuery(token);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <Link
            href={"/"}
            sx={{
              textDecoration: "none",
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
          </Link>
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
                <AutoComplete users={allUser} />
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
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              src={user?.profilePicture?.url}
              sx={{ width: "3rem", height: "3rem", cursor: "pointer" }}
            />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={() => navigate(`/profile/${user?._id}`)}>
              <Avatar src={user?.profilePicture?.url} /> My Profile
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={() => dispatch(setLogout())}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </FlexBetween>
      </Container>
    </FlexBetween>
  );
};

export default Navbar;
