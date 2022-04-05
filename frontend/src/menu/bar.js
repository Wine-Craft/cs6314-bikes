import React, { useContext, useEffect } from 'react';
import { Outlet } from "react-router-dom";

import Box from '@mui/material/Box';
import Badge from "@mui/material/Badge";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import NotificationsIcon from '@mui/icons-material/Notifications';

import Sidebar from './sidebar';
import SessionContext from "../session/context";

export default function Menubar() {
    const { user, isTechnician, isAdmin } = useContext(SessionContext);

    console.log(user, isTechnician, isAdmin);

    return (
        <div>
            <AppBar position="fixed" sm={{
                px: 10,
            }} color="neutral">
                <Toolbar>
                    <Box sx={{
                        flexGrow: 0,
                        mr: 2,
                    }}>
                        <Sidebar user={ user }/>
                    </Box>
                    <Box sx={{
                        flexGrow: 2,
                    }}>
                        <Typography variant="h5">
                            UTD Bikes
                        </Typography>
                    </Box>
                    <Box sx={{
                        px: 1,
                        flexGrow: 0,
                    }}>
                        <IconButton
                            size="large"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <div>
                <Toolbar />
                <Outlet />
            </div>
        </div>
    );
}