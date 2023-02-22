import { TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";
import React from "react";

const InputField = ({ rows = 1, multiline = false, label, ...props }) => {
  const [field, meta] = useField(props);
  const { submitCount } = useFormikContext();
  return (
    <TextField
      fullWidth
      label={label}
      rows={rows}
      multiline={multiline}
      variant="outlined"
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error) && submitCount > 0}
      helperText={meta.touched && submitCount > 0 ? meta.error : null}
    />
  );
};

export default InputField;
