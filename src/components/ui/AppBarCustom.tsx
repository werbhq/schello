import { AppBar, Toolbar, Button, Box, IconButton, Drawer } from '@mui/material';
import { Outlet, NavLink } from 'react-router-dom';
import ROUTES from 'routes';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { SDSColorPrimitives } from './Colours';
import logo from './../../assets/images/wordmark.svg';

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
    const [isOpen, setIsOpen] = useState(false);

    const activeLink: React.CSSProperties = {
        textDecoration: 'none',
        backgroundColor: '#6BE6EE',
        color: '#1C2D46',
        borderRadius: '150px',
    };

    const inActiveLink: React.CSSProperties = {
        textDecoration: 'none',
        backgroundColor: 'transparent',
        color: '#1C2D46',
        borderRadius: '150px',
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

    const [width, setWidth] = useState<Boolean>(() => getDeviceConfig(window.innerWidth));

    window.addEventListener('resize', () => setWidth(getDeviceConfig(window.innerWidth)));

    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="fixed"
                style={{
                    background: SDSColorPrimitives.white70,
                    boxShadow: 'none',
                    borderBottom: '1px solid #C7ADA580',
                    display: 'flex',
                    flexDirection: 'row',
                    zIndex: 1000,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Toolbar>
                    <img src={logo} height={32} alt="logo"></img>
                </Toolbar>

                <Toolbar>
                    {width ? (
                        <>
                            <IconButton onClick={handleOpen}>
                                <MenuIcon sx={{ color: '#ffffff' }} fontSize="large" />
                            </IconButton>
                            <Drawer
                                anchor="right"
                                open={isOpen}
                                onClose={handleClose}
                                PaperProps={{ sx: { backgroundColor: '#F1C043' } }}
                            >
                                <IconButton sx={{ mb: 2 }} disableRipple onClick={handleClose}>
                                    <CloseIcon />
                                </IconButton>

                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    sx={{ backgroundColor: 'inherit', width: '200px' }}
                                >
                                    <MenuItems navStyle={applyNavStyle} handleClose={handleClose} />
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
