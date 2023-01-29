import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, Link } from "react-router-dom";

export default function AppBarCustom() {
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
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/form">
            Form
          </Button>
          <Button color="inherit" component={Link} to="/community">
            Community
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}
