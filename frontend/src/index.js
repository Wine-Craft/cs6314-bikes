import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import App from './app';
import theme from "./styles/theme";
import SessionProvider from './session/provider';

axios.defaults.validateStatus = function () {
    return true;
};

ReactDOM.render(
    <React.StrictMode>
        <SessionProvider>
            <BrowserRouter>
                <ThemeProvider theme={ theme }>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        </SessionProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
