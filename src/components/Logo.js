import { Box } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import logoImg from "../logo.png";

function Logo({ disabledLink = false, sx }) {
  const logo = (
    <Box sx={{ height: 40, width: 40, ...sx }}>
      <img src={logoImg} alt="logo" width="100%" />
    </Box>
  );
  if (disabledLink) {
    return <>{logo}</>;
  }
  return <RouterLink to="/">{logo}</RouterLink>;
}

export default Logo;
