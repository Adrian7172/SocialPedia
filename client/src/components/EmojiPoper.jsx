import { Popover } from "@mui/material";
import EmojiPicker from "emoji-picker-react";
import { useField } from "formik";
import React from "react";
import { useSelector } from "react-redux";

const EmojiPoper = ({ name, id, openEmojis, anchorEl, handleEmojisClose }) => {
  const mode = useSelector((state) => state.persistedReducer.user.mode);
  const [field, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  const handleEmojisPicked = (e) => {
    setValue(value + e.emoji);
  };

  return (
    <Popover
      id={id}
      open={openEmojis}
      anchorEl={anchorEl}
      onClose={handleEmojisClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <EmojiPicker
        width={400}
        height={400}
        onEmojiClick={handleEmojisPicked}
        theme={mode === "dark" ? "dark" : "light"}
      />
    </Popover>
  );
};

export default EmojiPoper;
