import {
  AddLocationAlt,
  EmojiEmotions,
  GifBox,
  PermMedia,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useUserPostMutation } from "state/api/postApi";
import CustDivider from "./CustDivider";
import EmojiPoper from "./EmojiPoper";
import ImageModal from "./ImageModal";
import InputField from "./InputField";
import UserImage from "./UserImage";
import Wrapper from "./Wrapper";

const AddPost = () => {
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [preview, setPreview] = useState(null);
  const user = useSelector((state) => state.persistedReducer.user.userData);
  const token = useSelector((state) => state.persistedReducer.user.token);

  const [userPost, { isLoading }] = useUserPostMutation();

  /* Image Modal */
  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleModalClose = (e) => {
    setOpenModal(false);
  };

  /* Emojis */
  const handleEmojisClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEmojisClose = () => {
    setAnchorEl(null);
  };

  const openEmojis = Boolean(anchorEl);
  const id = openEmojis ? "simple-popover" : null;

  const theme = useTheme();

  /*  BREAK POINTS */
  const tabScreen = useMediaQuery("(max-width:765px)");
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  /* FORMIK */
  const formik = useFormik({
    initialValues: {
      caption: "",
      image: null,
      location: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        if (values.caption.length === 0 && values.image === null) {
          toast("post can't be empty");
        } else {
          const formData = new FormData();
          for (let value in values) {
            formData.append(value, values[value]);
          }
          formData.append("userId", user._id);
          const registeredPost = await userPost([formData, token]);
          toast(registeredPost.data.message);
          resetForm();
          setPreview(null);
        }
      } catch (error) {
        const msg = error.response.data.message
          ? error.response.data.message
          : "Something went wrong!!!";
        toast(msg);
      }
    },
  });

  return (
    <>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <Wrapper
            width="100%"
            display="flex"
            alignItems="center"
            gap={2}
            height="max-content"
          >
            <Box
              display={smallScreen ? "none" : "flex"}
              flex={1}
              alignSelf="flex-start"
              sx={{
                ml: "1rem",
                height: "100%",
                p: "1rem 0",
              }}
            >
              <Avatar
                src={user?.profilePicture.url}
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
                <InputField
                  name="caption"
                  type="text"
                  size="large"
                  multiline
                  rows={0}
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
              <Box></Box>
              <CustDivider></CustDivider>
              <Box width="100%">
                <UserImage
                  name="image"
                  setPreview={setPreview}
                  preview={preview}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  pr: smallScreen ? "0" : "2rem",
                }}
              >
                <Box
                  gap={1}
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Tooltip title="Add Image">
                    <IconButton onClick={handleModalOpen} size="small">
                      <PermMedia />
                    </IconButton>
                  </Tooltip>
                  <ImageModal
                    handleClose={handleModalClose}
                    openModal={openModal}
                    name="image"
                  />
                  <Tooltip title="Add GIF">
                    <IconButton size="small">
                      <GifBox />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Add location">
                    <IconButton size="small">
                      <AddLocationAlt />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Add emojis">
                    <IconButton
                      onClick={handleEmojisClick}
                      aria-describedby={id}
                      size="small"
                    >
                      <EmojiEmotions />
                    </IconButton>
                  </Tooltip>
                  <EmojiPoper
                    name="caption"
                    id={id}
                    openEmojis={openEmojis}
                    anchorEl={anchorEl}
                    handleEmojisClose={handleEmojisClose}
                  />
                </Box>

                <LoadingButton
                  loading={isLoading ? true : false}
                  loadingPosition="end"
                  type="submit"
                  variant="contained"
                  size="medium"
                  sx={{
                    mt: tabScreen ? "0.5rem" : "0.2rem",
                    height: "3.3rem",
                    padding: "0 2rem",
                    borderRadius: "2rem",
                  }}
                >
                  {isLoading ? "" : "post"}
                </LoadingButton>
              </Box>
            </Box>
          </Wrapper>
        </Form>
      </FormikProvider>
    </>
  );
};

export default AddPost;
