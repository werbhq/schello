import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createTheme, ThemeProvider, ThemeOptions } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import './assets/fonts/FixelDisplay/._FixelDisplay-Bold.ttf';

import { SDSColorPrimitives, SDSColoursSemantic } from 'components/ui/Colours';

const theme: ThemeOptions = createTheme({
    palette: {
        primary: {
            main: '#179f97',
        },
        secondary: {
            main: '#FFD700',
        },
        error: red,
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    typography: {
        fontFamily: 'Fixel Display',

        h1: {
            lineHeight: '120%',
            fontWeight: 'bold',
            color: '#1C2D46',
            fontStyle: 'normal',
            fontFeatureSettings: '"ss01" 1',
            letterSpacing: '-2.5px',
        },
        h2: {
            lineHeight: '120%',
            fontWeight: 'bold',
            color: '#1C2D46',
            fontStyle: 'normal',
            fontFeatureSettings: '"ss01" 1',
            letterSpacing: '-2.5px',
        },
        h3: {
            lineHeight: '120%',
            fontWeight: 'bold',
            color: '#1C2D46',
            fontStyle: 'normal',
            fontFeatureSettings: '"ss01" 1',
            letterSpacing: '-2.5px',
        },
        h4: {
            lineHeight: '120%',
            fontWeight: 'bold',
            color: '#1C2D46',
            fontStyle: 'normal',
            // fontFeatureSettings: '"ss01" 1',
            letterSpacing: '-2.5px',
        },
        h5: {
            lineHeight: '120%',
            fontWeight: 'bold',
            color: '#1C2D46',
            fontStyle: 'normal',

            letterSpacing: '-1.6px',
        },
        h6: {
            lineHeight: '120%',
            fontWeight: 'bold',
            color: '#1C2D46',
            fontStyle: 'normal',
            // fontFeatureSettings: '"ss01" 1',
            letterSpacing: '-0.5px',
        },

        body1: {
            fontFamily: 'Inter',
        },
        allVariants: {
            // fontFamily: 'Inter',
            // letterSpacing: '0px',
            //fontFeatureSettings: 'normal',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '10px',
                    border: '1px solid rgba(199, 173, 165, 0.50)',
                    background: 'linear-gradient(180deg, #154E44 0%, #179F97 100%)',
                    color: '#FFFFFF',
                    textTransform: 'none',
                    boxShadow: 'none',
                    ':disabled': {
                        background: 'rgba(199, 173, 165, 0.50)',
                    },
                },

                // height: 48,
                // padding: '0x 30px',
                // margin: '0px 20px',
            },
        },

        MuiLink: {
            styleOverrides: {
                root: {},
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    border: '1px solid rgba(199, 173, 165, 0.50)',
                    background: '#FFF',
                    boxShadow: '0px 4px 50px 0px rgba(64, 93, 136, 0.04)',
                },
            },
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
