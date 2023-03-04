import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Outlet, NavLink } from "react-router-dom";

export default function AppBarCustom() {
  const activeLink = {
    backgroundColor: "#f9f9f9",
    borderRadius: "2px",
    textDecoration: "none",
    color: "#4374f1",
  };
  const inActiveLink = {
    backgroundColor: "inherit",
    borderRadius: "2px",
    textDecoration: "none",
    color: "inherit",
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#F1C043" }}>
        <Toolbar>
          {/* <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Schello
          </Typography>
          <NavLink
            style={({ isActive }) => (isActive ? activeLink : inActiveLink)}
            to="/"
            end
          >
            <Button color="inherit">Home</Button>
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeLink : inActiveLink)}
            to="form"
            end
          >
            <Button color="inherit">Form</Button>
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeLink : inActiveLink)}
            to="community"
            end
          >
            <Button color="inherit">Community</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}
