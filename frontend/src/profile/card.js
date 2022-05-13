import React from 'react';
import {Link} from "react-router-dom";

import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Skill from "../skills/skill";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";

import StarIcon from '@mui/icons-material/Star';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


export default function TechnicianCard({
    technician,
}) {
    const id = technician._id;
    const userID = technician.userID;
    const name = technician.name;
    const fullName = `${ name.given } ${ name.family }`;
    const imageURL = technician.imageURL;
    const skills = technician.skills;
    const aboutMe = technician.aboutMe;

    return (
        <Card sx={{
            width: 300,
        }}>
            <CardContent sx={{
                p: 3,
                pb: 0,
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <Box sx={{
                        flexGrow: 0,
                    }}>
                        <Avatar src={ imageURL } sx={{
                            width: 100,
                            height: 100,
                        }}/>
                    </Box>
                </Box>
                <Grid container justifyContent="center">
                    <Grid item>
                        <Typography variant="h6">{ fullName }</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">{ aboutMe }</Typography>
                    </Grid>
                </Grid>
                <Box sx={{
                    display: 'flex',
                    overflowX: 'scroll',
                    gap: 0.5,
                    mt: 1,
                }}>
                    <>{ skills.map((skill) => (
                        <Box sx={{
                        }} key={ skill._id }>
                            <Skill
                                skill={ skill }
                            />
                        </Box>
                    ))}</>
                </Box>
            </CardContent>
            <CardActions disableSpacing>
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                }}>
                    <Box>
                        <Tooltip title="Star">
                            <IconButton>
                                <StarIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box sx={{
                        flexGrow: 1,
                    }}>
                        <Tooltip title="Request Job">
                            <IconButton
                                component={ Link }
                                to={ `/create-job?id=${ userID }`}
                            >
                                <NoteAddIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box>
                        <Tooltip title="Read Details">
                            <IconButton
                                component={ Link }
                                to={ `/profile?id=${ userID }` }
                            >
                                <OpenInNewIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </CardActions>
        </Card>
    );
}