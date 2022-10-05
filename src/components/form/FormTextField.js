import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

function FormTextField({ control, name, label, ...other }) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <TextField
              fullWidth
              error={!!error}
              label={label}
              helperText={error?.message}
              {...field}
              {...other}
            />
          );
        }}
      />
    </>
  );
}

export default FormTextField;
