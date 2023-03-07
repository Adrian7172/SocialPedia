import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useField, useFormikContext } from "formik";
import React from "react";

const SelectInput = ({ name, label, required, margin }) => {
  const [field, meta] = useField(name);
  const { submitCount } = useFormikContext();

  return (
    <FormControl margin={margin} required={required} fullWidth>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        label={label}
        {...field}
        error={meta.touched && Boolean(meta.error) && submitCount > 0}
        helperText={meta.touched && submitCount > 0 ? meta.error : null}
      >
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectInput;
