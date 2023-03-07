import { useTheme } from "@emotion/react";
import { Close } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Modal,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import FlexBetween from "./FlexBetween";
import ImageDropzone from "./ImageDropzone";

const ImageModal = ({ openModal, handleClose, name }) => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        boxShadow={5}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: smallScreen ? "95%" : "55rem",
          bgcolor: theme.palette.background.default,
          boxShadow: 24,
          borderRadius: "2rem",
          p: "2rem 2rem 3rem 2rem",
        }}
      >
        <FlexBetween width="100%" mb="1.2rem">
          {" "}
          <Typography
            variant="h5"
            sx={{
              fontSize: "2.2rem",
              fontWeight: "600",
            }}
          >
            Drop your image here
          </Typography>
        </FlexBetween>
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: "1rem",
            top: "1rem",
            "&:hover": {
              cursor: "pointer",
              color: theme.palette.primary.main,
            },
          }}
        >
          <Close />
        </IconButton>

        <ImageDropzone name={name} />
      </Box>
    </Modal>
  );
};

export default ImageModal;
