import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Avatar, Divider } from "@mui/material";
import useAuth from "../hooks/useAuth";
import { Link as routerLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

function MainHeader() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout(() => navigate(from));
      setAnchorEl(null);
    } catch (error) {
      console.log(error);
    }
  };

  const renderMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="subtitle2" noWrap>
          {user.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {user.email}
        </Typography>
      </Box>
      <Divider />
      <MenuItem
        onClick={handleClose}
        sx={{ mx: 1 }}
        component={routerLink}
        to="/"
      >
        My Profile
      </MenuItem>
      <MenuItem
        onClick={handleClose}
        sx={{ mx: 1 }}
        component={routerLink}
        to="/account"
      >
        Account Settings
      </MenuItem>
      <MenuItem
        onClick={handleLogout}
        sx={{ mx: 1 }}
        component={routerLink}
        to="/login"
      >
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ mb: 3 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Logo />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CoderComm
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Avatar
              src={user.avatarUrl}
              alt={user.name}
              sx={{ cursor: "pointer" }}
              onClick={handleMenu}
            />
          </Box>
        </Toolbar>
        {renderMenu}
      </AppBar>
    </Box>
  );
}

export default MainHeader;
