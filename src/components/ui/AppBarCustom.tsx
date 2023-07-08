import {
    AppBar,
    Toolbar,
    Button,
    Box,
    IconButton,
    Drawer,
    Stack,
    Grid,
    Typography,
} from '@mui/material';
import { Outlet, NavLink } from 'react-router-dom';
import ROUTES from 'routes';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Report } from '@mui/icons-material';
import { useState } from 'react';
import { SDSColorsSemantic } from './Colours';
import logo from './../../assets/images/wordmark.svg';

const linkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: SDSColorsSemantic.onBackgroundSecondary,
};

const MenuItems = ({
    navStyle,
    handleClose = () => {},
}: {
    navStyle: ({ isActive }: { isActive: boolean }) => React.CSSProperties;
    handleClose?: () => void;
}) => {
    return (
        <>
            <NavLink style={navStyle} to={ROUTES.DEFAULT} onClick={handleClose} end>
                <Typography style={linkStyle}>Home</Typography>
            </NavLink>
            <NavLink style={navStyle} to={ROUTES.COMMUNITY} onClick={handleClose} end>
                <Typography style={linkStyle}>Explore</Typography>
            </NavLink>
            <NavLink style={navStyle} to={ROUTES.CHAT} onClick={handleClose} end>
                <Typography style={linkStyle}>Wellness Bot</Typography>
            </NavLink>
        </>
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
        backgroundColor: SDSColorsSemantic.brandSecondary,
        color: `${SDSColorsSemantic.surface} !important`,
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
                    background: SDSColorsSemantic.surface,
                    boxShadow: 'none',
                    borderBottom: '1px solid #C7ADA580',
                    zIndex: 1000,
                }}
            >
                <Grid container direction={'row'} wrap={'nowrap'}>
                    <Grid item xs sm md lg></Grid>
                    <Grid
                        item
                        container
                        direction={'row'}
                        xs={12}
                        sm={10}
                        md={10}
                        lg={10}
                        justifyContent={'space-between'}
                    >
                        <Toolbar>
                            <img src={logo} height={32} alt="logo"></img>
                        </Toolbar>

                        <Toolbar>
                            {width ? (
                                <></>
                            ) : (
                                <Stack gap={'8px'} direction={'row'}>
                                    <MenuItems navStyle={applyNavStyle} />
                                </Stack>
                            )}
                        </Toolbar>

                        <Toolbar>
                            {width ? (
                                <>
                                    <IconButton onClick={handleOpen}>
                                        <MenuIcon
                                            sx={{ color: SDSColorsSemantic.brandPrimary }}
                                            fontSize="large"
                                        />
                                    </IconButton>
                                    <Drawer
                                        anchor="right"
                                        open={isOpen}
                                        onClose={handleClose}
                                        PaperProps={{
                                            sx: {
                                                backgroundColor: SDSColorsSemantic.background,
                                                padding: '16px',
                                                width: '75vw',
                                            },
                                        }}
                                    >
                                        <IconButton
                                            sx={{ mb: 2 }}
                                            disableRipple
                                            onClick={handleClose}
                                        >
                                            <CloseIcon />
                                        </IconButton>

                                        <Stack gap={'8px'} direction={'column'}>
                                            <MenuItems
                                                navStyle={applyNavStyle}
                                                handleClose={handleClose}
                                            />
                                        </Stack>
                                    </Drawer>
                                </>
                            ) : (
                                <NavLink to={ROUTES.DRUG_FORM} end>
                                    <Button
                                        startIcon={<Report />}
                                        color="inherit"
                                        onClick={handleClose}
                                        fullWidth
                                    >
                                        Report Anonymously
                                    </Button>
                                </NavLink>
                            )}
                        </Toolbar>
                    </Grid>
                    <Grid item xs sm md lg></Grid>
                </Grid>
            </AppBar>
            <Outlet />
        </Box>
    );
}
