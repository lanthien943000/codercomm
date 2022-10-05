import { Link, Typography } from "@mui/material";
import React from "react";
// import { Link as routerLink } from "react-router-dom";

function MainFooter() {
  return (
    <div>
      <Typography
        sx={{ textAlign: "center", padding: "10px 0" }}
        variant="body2"
        color="text.secondary"
      >
        Copyright ©{" "}
        <Link
          // component={routerLink}
          sx={{ textDecoration: "none", color: "text.secondary" }}
          href="https://www.coderschool.vn"
        >
          CoderSchool
        </Link>{" "}
        {new Date().getFullYear()}
      </Typography>
    </div>
  );
}

export default MainFooter;
