import React from "react";
import { Link } from 'react-router-dom';

import Menu from '@mui/material/Menu';
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from '@mui/material/MenuItem';
import IconButton from "@mui/material/IconButton";
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import DashboardIcon from '@mui/icons-material/Dashboard';



export default function ProfileDropdown({
    user,
}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const given = user.name.given.charAt(0);
    const family = user.name.family.charAt(0);
    const imageURL = user.imageURL;

    const open = anchorEl != null;

    return (
        <React.Fragment>
            <Tooltip title="Account Settings">
                <IconButton
                    onClick={ (e) => {
                        setAnchorEl(e.target);
                    }}
                >
                    <Avatar src={ imageURL }>
                        { `${given}${family}`}
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={ anchorEl }
                open={ open }
                onClose={ () => setAnchorEl(null) }
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Link to="/profile" style={{
                    textDecoration: 'none',
                    color: 'inherit',
                }}>
                    <MenuItem sx={{
                        m: 1,
                    }}>
                        <Avatar /> Profile
                    </MenuItem>
                </Link>
                <Link to="/tech-dashboard" style={{
                    textDecoration: 'none',
                    color: 'inherit',
                }}>
                    <MenuItem sx={{
                        m: 1,
                    }}>
                        <ListItemIcon>
                            <DashboardIcon fontSize="small" />
                        </ListItemIcon>
                        Technician Dashboard
                    </MenuItem>
                </Link>
                <Divider />
                <Link to="/logout" style={{
                    textDecoration: 'none',
                    color: 'inherit',
                }}>
                    <MenuItem sx={{
                        m: 1,
                    }}>
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Link>
            </Menu>
        </React.Fragment>
    );
}