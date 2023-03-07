import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "mui-image";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "state/authSlice";

const NavComponent = ({
  id,
  active,
  handleActive,
  IconComponent = null,
  name = "",
  icon = "",
  navigate,
}) => {
  const theme = useTheme();
  const navigates = useNavigate();
  const dispatch = useDispatch();
  /*  BREAK POINTS */
  const tabScreen = useMediaQuery("(max-width:765px)");
  const smallScreen = useMediaQuery("(max-width:650px)");

  return (
    <>
      {!smallScreen ? (
        <Box
          onClick={
            id === "8"
              ? () => dispatch(setLogout())
              : () => {
                  handleActive(id);
                  navigates(navigate);
                }
          }
          p="0 1.5rem"
          height="4rem"
          display="flex"
          gap="2rem"
          width="100%"
          sx={{
            margin: "0.4rem 0",
            alignItems: "center",
            cursor: "pointer",
            justifyContent: tabScreen ? "center" : "",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              width: "max-content",
              borderBottom: active === id ? "3px solid" : "",
              borderColor: theme.palette.primary.main,
              padding: "0 1rem",
            }}
          >
            <Image src={icon} width="2.5rem" height="2.2rem"></Image>
          </Box>

          <Typography
            variant="p"
            sx={{
              fontSize: "1.5rem",
              fontWeight: active === id ? "600" : "500",
              display: tabScreen ? "none" : "block",
              color:
                active !== id
                  ? theme.palette.neutral.main
                  : theme.palette.primary.main,
            }}
          >
            {name}
          </Typography>
        </Box>
      ) : (
        <IconButton
          onClick={() => {
            handleActive(id);
            navigates(navigate);
          }}
          size="small"
          sx={{
            color:
              active === id
                ? theme.palette.primary.main
                : theme.palette.neutral.main,
          }}
        >
          {IconComponent}
        </IconButton>
      )}
    </>
  );
};

export default NavComponent;
