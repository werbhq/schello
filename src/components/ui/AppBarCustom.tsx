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

const MenuItems = ({
  navStyle,
  handleClose = () => {},
}: {
  navStyle: ({ isActive }: { isActive: boolean }) => React.CSSProperties;
  handleClose?: () => void;
}) => {
  return (
    <>
      <NavLink style={navStyle} to={ROUTES.DEFAULT} end>
        <Button color="inherit" onClick={handleClose} fullWidth>
          Home
        </Button>
      </NavLink>
      <NavLink style={navStyle} to={ROUTES.DRUG_FORM} end>
        <Button color="inherit" onClick={handleClose} fullWidth>
          Form
        </Button>
      </NavLink>
      <NavLink style={navStyle} to={ROUTES.COMMUNITY} end>
        <Button color="inherit" onClick={handleClose} fullWidth>
          Community
        </Button>
      </NavLink>
      <NavLink style={navStyle} to={ROUTES.CHAT} end>
        <Button color="inherit" onClick={handleClose} fullWidth>
          Helpline
        </Button>
      </NavLink>
    </>
  );
};

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
    if (width < 320) return true;
    if (width >= 320 && width < 720) return true;
    if (width >= 720 && width < 1024) return false;
    if (width >= 1024) return false;
    return false;
  };

  const [width, setWidth] = useState<Boolean>(() =>
    getDeviceConfig(window.innerWidth)
  );

  window.addEventListener("resize", () =>
    setWidth(getDeviceConfig(window.innerWidth))
  );

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

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
              <IconButton onClick={handleOpen}>
                <MenuIcon sx={{ color: "#ffffff" }} fontSize="large" />
              </IconButton>
              <Drawer
                anchor="right"
                open={isOpen}
                onClose={handleClose}
                PaperProps={{ sx: { backgroundColor: "#F1C043" } }}
              >
                <IconButton sx={{ mb: 2 }} disableRipple onClick={handleClose}>
                  <CloseIcon />
                </IconButton>

                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ backgroundColor: "inherit", width: "200px" }}
                >
                  <MenuItems
                    navStyle={applyNavStyle}
                    handleClose={handleClose}
                  />
                </Box>
              </Drawer>
            </>
          ) : (
            <MenuItems navStyle={applyNavStyle} />
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}
