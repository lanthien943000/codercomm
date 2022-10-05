import React from "react";
import { FormProvider as RHFormProvide } from "react-hook-form";

function FormProvider({ onSubmit, methods, children }) {
  return (
    <RHFormProvide {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </RHFormProvide>
  );
}

export default FormProvider;
