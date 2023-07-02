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
            main: '#AF53F7',
        },
        secondary: {
            main: '#6BE6EE',
        },
        error: red,
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    typography: {
        fontFamily: ['Inter', 'roboto'].join(','),
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '10px',
                    border: '1px solid rgba(199, 173, 165, 0.50)',
                    background: 'linear-gradient(180deg, #1C2D46 0%, #204377 100%)',
                    color: '#FFFFFF',
                    textTransform: 'none',
                    boxShadow: 'none',
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
