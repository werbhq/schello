import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
} from "@mui/material";
import { Outlet, NavLink } from "react-router-dom";
import ROUTES from "routes";

export default function AppBarCustom() {
  const theme = useTheme();

  const activeLink: React.CSSProperties = {
    backgroundColor: "#f9f9f9",
    borderRadius: "2px",
    textDecoration: "none",
    color: theme.palette.primary.main,
  };

  const inActiveLink: React.CSSProperties = {
    backgroundColor: "inherit",
    borderRadius: "2px",
    textDecoration: "none",
    color: "inherit",
  };

  const applyNavStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? activeLink : inActiveLink;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ background: theme.palette.secondary.main }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Schello
          </Typography>
          <NavLink style={applyNavStyle} to={ROUTES.DEFAULT} end>
            <Button color="inherit">Home</Button>
          </NavLink>
          <NavLink style={applyNavStyle} to={ROUTES.DRUG_FORM} end>
            <Button color="inherit">Form</Button>
          </NavLink>
          <NavLink style={applyNavStyle} to={ROUTES.COMMUNITY} end>
            <Button color="inherit">Community</Button>
          </NavLink>
          <NavLink style={applyNavStyle} to={ROUTES.CHAT} end>
            <Button color="inherit">Helpline</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}
