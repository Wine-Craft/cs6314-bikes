import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import ListItem from "@mui/material/ListItem";
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";

export default function Sidebar({
    user,
}) {
    const theme = useTheme();

    const given = user.name.given;
    const family = user.name.family;
    const imageURL = user.imageURL;

    const [ open, setOpen ] = useState(false);

    const textColor = theme.palette.neutral.contrastText;
    return (
        <React.Fragment>
            <Tooltip title={ "Open menu" }>
                <IconButton size="large" sx={{
                    color: textColor,
                }} onClick={
                    () => setOpen(!open)
                }>
                    <MenuIcon fontSize="inherit" />
                </IconButton>
            </Tooltip>
            <Drawer
                open={ open }
                onClose={ ()=> setOpen(false) }
            >
                <List>
                    <ListItem>
                        <ListItemButton component={ Link } to="/profile">
                            <ListItemAvatar>
                                <Avatar src={ imageURL }>
                                    { `${given.charAt(0) }${family.charAt(0)}`}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={ `${given}` }
                                secondary={ `View Profile` }
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton component={ Link } to="/logout">
                            <ListItemText
                                secondary={ `Sign Out` }
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </React.Fragment>
    );
}