import { FormHelperText } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import UploadImage from "../UploadImage";

function FormUploadImage({ name, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;
        return (
          <UploadImage
            accept="image/*"
            error={checkError}
            file={field.value}
            helperTexl={
              checkError && (
                <FormHelperText error sx={{ px: 2 }}>
                  {error.message}
                </FormHelperText>
              )
            }
            {...other}
          />
        );
      }}
    >
      <UploadImage />
    </Controller>
  );
}

export default FormUploadImage;
