import { Avatar, Button, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import FlexBetween from "./FlexBetween";
import { useTheme } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useField } from "formik";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];

const validateImage = (file) => {
  if (file.size > MAX_FILE_SIZE) {
    return "File size must be less than 2 MB";
  }
  if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
    return "File type must be JPEG, PNG, or GIF";
  }
  return null;
};

const ImageDropzone = ({ name }) => {
  const [field, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  const [preview, setPreview] = useState(value ? URL.createObjectURL(value) : null);
  const [error, setError] = useState(null);

  
  const theme = useTheme();

  const onDrop = useCallback(
    (files) => {
      setError(null);
      setPreview(null);
      const file = files[0];
      const validationError = validateImage(file);
      if (validationError != null) {
        setError(validationError);
        return;
      }
      setPreview(URL.createObjectURL(file));
      setValue(file);
    },
    [value]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <>
      <FlexBetween
        {...getRootProps()}
        sx={{
          position: "relative",
          border: "0.2rem dashed",
          borderRadius: "1rem",
          height: "20rem",
          borderColor: error ? "red" : theme.palette.primary.main,

          cursor: "pointer",
          "&:hover": {
            borderColor: theme.palette.primary.light,
          },
        }}
      >
        <input {...getInputProps()} />
        <Avatar
          src={preview ? preview : null}
          sx={{
            width: "15rem",
            height: "15rem",
            background: error ? "red" : null,
          }}
        ></Avatar>
        <Button
          color="primary"
          sx={{
            position: "absolute",
            bottom: "0.5rem",
            right: "0",
          }}
        >
          <Edit />
        </Button>
      </FlexBetween>
      {error && (
        <FlexBetween>
          <Typography variant="p" sx={{ color: "red", marginTop: "0.5rem" }}>
            {error}
          </Typography>
        </FlexBetween>
      )}
    </>
  );
};

export default ImageDropzone;
