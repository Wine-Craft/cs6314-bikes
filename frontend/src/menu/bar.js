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

import ProfileDropdown from "./profile";
import SessionContext from "../session/context";

export default function Menubar() {
    const { user } = useContext(SessionContext);

    useEffect(() => {
        console.log(user);
    }, [ user ]);

    return (
        <div>
            <AppBar position="fixed" sm={{
                px: 10,
            }}>
                <Toolbar>
                    <Box sx={{
                        flexGrow: 0,
                        mr: 2,
                    }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
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
                    <Box sx={{
                        px: 1,
                        flexGrow: 0,
                    }}>
                        <ProfileDropdown user={ user }/>
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