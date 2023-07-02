import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createTheme, ThemeProvider, ThemeOptions } from '@mui/material/styles';
import { red } from '@mui/material/colors';

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
        // MuiButton: {
        //     styleOverrides: {
        //         root: {
        //             background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        //             border: 3,
        //             borderRadius: '50px',
        //             boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        //             color: 'white',
        //             // height: 48,
        //             // padding: '0x 30px',
        //             // margin: '0px 20px',
        //         },
        //     },
        // },
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
