import {
  Alert,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormProvider, FormTextField } from "../components/form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yub from "yup";
import { Link as routerLink, useLocation, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import useAuth from "../hooks/useAuth";

const Register = Yub.object().shape({
  name: Yub.string().required("Name is required"),
  email: Yub.string().email("Invalid Email").required("Email is required"),
  password: Yub.string().required("Password is required"),
  passwordConfirmation: Yub.string()
    .oneOf([Yub.ref("password")], "Password must be the same")
    .required("Password Confirmation is required"),
});

const defaultValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordconfirmation] =
    useState(false);
  const auth = useAuth();
  const location = useLocation();
  const from = location.state?.form?.pathname || "/";
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(Register),
  });
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    try {
      await auth.register({ name, email, password }, () => navigate(from));
    } catch (error) {
      setError("responseError", error);
    }
  };
  return (
    <Container maxWidth="xs">
      <Typography variant="h3" sx={{ textAlign: "center", marginBottom: 2 }}>
        REGISTER
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
          <Alert severity="info">
            Already have account?{" "}
            <Link
              variant="subtitle1"
              component={routerLink}
              to="/login"
              sx={{ textDecoration: "none" }}
            >
              Sign In
            </Link>
          </Alert>
          <FormTextField control={control} name="name" label="Full Name" />
          <FormTextField control={control} name="email" label="Email Address" />
          <FormTextField
            control={control}
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormTextField
            control={control}
            name="passwordConfirmation"
            label="Password Confirmation"
            type={showPasswordConfirmation ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowPasswordconfirmation(!showPasswordConfirmation)
                    }
                    edge="end"
                  >
                    {showPasswordConfirmation ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton
            type="submit"
            loading={isSubmitting}
            size="large"
            variant="contained"
          >
            REGISTER
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default RegisterPage;
