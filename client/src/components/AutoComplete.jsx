import {
  Autocomplete,
  Avatar,
  Box,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const AutoComplete = ({ users }) => {
  const navigate = useNavigate();

  // check if users has data
  if (!users) return;

  const renderOption = (props, option, { selected }) => {
    const profilePicture = option?.profilePicture?.url;
    const fullName = option?.fullName;
    const bio = trucateString(option?.bio);

    return (
      <Box
        key={option?._id}
        gap={1}
        sx={{
          display: "flex",
          width: "100%",
          p: "1rem",
          cursor: "pointer",
          flexDirection: "column",
        }}
        onClick={() => navigate(`/profile/${option?._id}`)}
      >
        <Box display="flex" gap={2}>
            <Avatar
              src={profilePicture}
              sx={{
                width: "4rem",
                height: "4rem",
                alignSelf: "flex-start"
              }}
            />
          <Box>
            <Typography
              sx={{
                fontWeight: "600",
              }}
            >
              {fullName}
            </Typography>
            <Typography>{bio}</Typography>
          </Box>
        </Box>
        <Divider width="100%" />
      </Box>
    );
  };

  return (
    <Autocomplete
      freeSolo
      clearOnEscape={false}
      sx={{
        borderColor: "transparent",
      }}
      options={users}
      getOptionLabel={(option) =>
        `${option.fullName || ""} ${option.bio || ""}`
      }
      renderOption={renderOption}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          placeholder="Search..."
          autoFocus
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "transparent",
                borderWidth: 0,
                outline: 0,
              },
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
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
      )}
      onChange={(event, value) => {
        if (value) {
          navigate(`/search/${value}`);
        }
      }}
    />
  );
};

export default AutoComplete;

function trucateString(str) {
  if (str?.length > 33) {
    str = str.slice(0, 30) + "...";
  }
  return str;
}
