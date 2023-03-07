import { Close, Opacity } from "@mui/icons-material";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import { useField } from "formik";
import Image from "mui-image";
import React, { useEffect, useState } from "react";
import { colorToken } from "theme";
import CustDivider from "./CustDivider";

const UserImage = ({ name , preview, setPreview}) => {
  
  const [field, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  const middleScreen = useMediaQuery("(max-width: 860px)");
  const smallScreen = useMediaQuery("(max-width: 600px)");
  const verySmallScreen = useMediaQuery("(max-width: 300px)");

  const handleClose = () => {
    setValue(null);
    setPreview(null);
  };

  useEffect(() => {
    if (value) setPreview(URL.createObjectURL(value));
  }, [value]);

  return (
    <>
      {preview && (
        <Box width="100%">
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "max-content",
            }}
          >
            <Image
              width={
                middleScreen
                  ? smallScreen
                    ? verySmallScreen
                      ? "20rem"
                      : "100%"
                    : "30rem"
                  : "45rem"
              }
              height={middleScreen ? "30rem" : "35rem"}
              src={preview}
              sx={{
                borderRadius: "2rem",
              }}
            />
            <IconButton
              onClick={handleClose}
              size="small"
              sx={{
                position: "absolute",
                top: "1rem",
                left: "1rem",
                zIndex: "10",
                bgcolor: "rgba(0, 0, 0, 0.4)",
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(0, 0, 0, 0.6)",
                },
              }}
            >
              <Close />
            </IconButton>
          </Box>
          <CustDivider></CustDivider>
        </Box>
      )}
    </>
  );
};

export default UserImage;
