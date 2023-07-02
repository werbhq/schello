import { AppBar, Toolbar, Button, Box, IconButton, Drawer, Link, Stack } from '@mui/material';
import { Outlet, NavLink } from 'react-router-dom';
import ROUTES from 'routes';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { SDSColorPrimitives, SDSColoursSemantic } from './Colours';
import logo from './../../assets/images/wordmark.svg';

const linkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: SDSColoursSemantic.onBackgroundSecondary,
};

const MenuItems = ({
    navStyle,
    handleClose = () => {},
}: {
    navStyle: ({ isActive }: { isActive: boolean }) => React.CSSProperties;
    handleClose?: () => void;
}) => {
    return (
        <Stack gap={'8px'} direction={'row'}>
            <NavLink style={navStyle} to={ROUTES.DEFAULT} end>
                <Link style={linkStyle} onClick={handleClose}>
                    Home
                </Link>
            </NavLink>
            <NavLink style={navStyle} to={ROUTES.COMMUNITY} end>
                <Link style={linkStyle} onClick={handleClose}>
                    Library
                </Link>
            </NavLink>
            <NavLink style={navStyle} to={ROUTES.CHAT} end>
                <Link style={linkStyle} onClick={handleClose}>
                    Wellness Bot
                </Link>
            </NavLink>
            <NavLink to={ROUTES.DRUG_FORM} end>
                <Button color="inherit" onClick={handleClose} fullWidth>
                    Report Anonymously
                </Button>
            </NavLink>
        </Stack>
    );
};

export default function AppBarCustom() {
    const [isOpen, setIsOpen] = useState(false);

    const navLink: React.CSSProperties = {
        textDecoration: 'none',

        borderRadius: '150px',
        padding: '8px 16px',
    };

    const activeLink: React.CSSProperties = {
        backgroundColor: SDSColoursSemantic.brandSecondary,
        color: `${SDSColoursSemantic.surface} !important`,
    };

    const inActiveLink: React.CSSProperties = {
        backgroundColor: 'transparent',
    };

    const applyNavStyle = ({ isActive }: { isActive: boolean }) =>
        isActive ? { ...activeLink, ...navLink } : { ...inActiveLink, ...navLink };

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
                    background: SDSColoursSemantic.surface,
                    boxShadow: 'none',
                    borderBottom: '1px solid #C7ADA580',
                    display: 'flex',
                    flexDirection: 'row',
                    zIndex: 1000,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingLeft: '146px',
                    paddingRight: '146px',
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
