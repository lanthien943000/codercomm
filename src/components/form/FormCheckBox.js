import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

function FormCheckbox({ control, name, label }) {
  return (
    <FormControlLabel
      label={label}
      control={
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => {
            return <Checkbox {...field} checked={field.value} />;
          }}
        />
      }
    />
  );
}

export default FormCheckbox;
