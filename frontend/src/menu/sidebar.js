import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';

import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListIcon from '@mui/icons-material/List';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import HistoryIcon from '@mui/icons-material/History';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import SessionContext from "../session/context";

export default function Sidebar() {
    const { user, isTechnician, isAdmin } = useContext(SessionContext);

    const theme = useTheme();

    const given = user.name.given;
    const family = user.name.family;
    const imageURL = user.imageURL;

    const [ open, setOpen ] = useState(false);
    const [ techOpen, setTechOpen ] = useState(true);
    const [ adminOpen, setAdminOpen ] = useState(false);

    const textColor = theme.palette.primary.contrastText;
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
                                secondary={ `View profile` }
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton component={ Link } to="/jobs">
                            <ListItemIcon>
                                <ReceiptLongIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={ `My Jobs` }
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton component={ Link } to="/browse-technicians">
                            <ListItemIcon>
                                <ListIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={ `Browse Technicians` }
                            />
                        </ListItemButton>
                    </ListItem>
                    <> { isAdmin &&
                        <>
                            <ListItem>
                                <ListItemButton onClick={ () => setAdminOpen(!adminOpen) }>
                                    <ListItemText>
                                        Admins
                                    </ListItemText>
                                    { adminOpen ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
                                </ListItemButton>
                            </ListItem>
                            <Collapse in={ adminOpen } unmountOnExit>
                                <List sx={{
                                    pl: 3,
                                }}>
                                    <ListItem>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <DesktopMacIcon />
                                            </ListItemIcon>
                                            <ListItemText>
                                                Admin Panel
                                            </ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </Collapse>
                        </>
                    } </>
                    <ListItem>
                        <ListItemButton component={ Link } to="/logout">
                            <ListItemText
                                secondary={ `Sign Out` }
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider></Divider>
                <List>
                    <ListItem>
                        <ListItemButton component={ Link } to="/about-us">
                            <ListItemText> About Us </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton component={ Link } to="/about-us">
                            <ListItemText> Careers </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </React.Fragment>
    );
}