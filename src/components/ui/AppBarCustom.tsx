import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  IconButton,
  Drawer,
} from "@mui/material";
import { Outlet, NavLink } from "react-router-dom";
import ROUTES from "routes";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export default function AppBarCustom() {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

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

  const getDeviceConfig = (width: number) => {
    if (width < 320) {
      return true;
    } else if (width >= 320 && width < 720) {
      return true;
    } else if (width >= 720 && width < 1024) {
      return false;
    } else if (width >= 1024) {
      return false;
    } else {
      return false;
    }
  };

  const [width, setWidth] = useState<Boolean>(() =>
    getDeviceConfig(window.innerWidth)
  );

  window.addEventListener("resize", () =>
    setWidth(getDeviceConfig(window.innerWidth))
  );

  const handleClose = () => setIsOpen(false);

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
          {width ? (
            <>
              <IconButton onClick={() => setIsOpen(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={isOpen}
                onClose={handleClose}
                PaperProps={{ sx: { backgroundColor: "#F1C043" } }}
              >
                <IconButton sx={{ mb: 2 }} disableRipple>
                  <CloseIcon onClick={handleClose} />
                </IconButton>

                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ backgroundColor: "inherit", width: "200px" }}
                >
                  <NavLink style={applyNavStyle} to={ROUTES.DEFAULT} end>
                    <Button color="inherit" onClick={handleClose}>
                      Home
                    </Button>
                  </NavLink>
                  <NavLink style={applyNavStyle} to={ROUTES.DRUG_FORM} end>
                    <Button color="inherit" onClick={handleClose}>
                      Form
                    </Button>
                  </NavLink>
                  <NavLink style={applyNavStyle} to={ROUTES.COMMUNITY} end>
                    <Button color="inherit" onClick={handleClose}>
                      Community
                    </Button>
                  </NavLink>
                  <NavLink style={applyNavStyle} to={ROUTES.CHAT} end>
                    <Button color="inherit" onClick={handleClose}>
                      Helpline
                    </Button>
                  </NavLink>
                </Box>
              </Drawer>
            </>
          ) : (
            <>
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
            </>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}
