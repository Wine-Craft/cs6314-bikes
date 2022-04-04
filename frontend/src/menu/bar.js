import React from 'react';

import Box from '@mui/material/Box';
import AppBar from "@mui/material/AppBar";
import { Outlet } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Menubar({ children }) {
    return (
        <div>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h5">
                        UTD Bikes
                    </Typography>
                </Toolbar>
            </AppBar>
            <div>
                <Toolbar />
                <Outlet />
            </div>
        </div>

    );
}