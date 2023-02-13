import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useField, useFormikContext } from "formik";
import React from "react";

const MyDatePicker = ({ name, label, required }) => {
  const [field, meta, helpers] = useField(name);
  const { submitCount } = useFormikContext();
  const { value } = meta;
  const { setValue } = helpers;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        {...field}
        selected={value}
        onChange={(date) => setValue(date)}
        renderInput={(params) => (
          <TextField
            {...params}
            margin="normal"
            fullWidth
            required={required}
            error={meta.touched && Boolean(meta.error) && submitCount > 0}
            helperText={meta.touched && submitCount > 0 ? meta.error : null}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default MyDatePicker;
