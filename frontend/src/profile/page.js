import React, {useContext} from 'react';

import SessionContext from '../session/context';

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import {TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TechnicianProfile from "./technician";

export default function ProfilePage() {
    const { user } = useContext(SessionContext);

    console.log(user);
    return (
        <Grid m={ 3 }>
            <Grid container
                alignItems="center"
                justifyContent="center"
            >
                <Grid item xs={ 12 } sm={ 10 } md={ 8 } lg={ 6 }>
                    <Avatar
                        src={ user.imageURL }
                        sx={{
                            width: 75,
                            height: 75,
                            marginBottom: 3,
                        }}
                    />
                    <Typography variant="h4"> Your Profile </Typography>
                    <Grid mt={1} mb={ 4 } container spacing={ 3 }>
                        <Grid item xs={ 6 }>
                            <TextField
                                variant="outlined"
                                label="First Name"
                                fullWidth
                                value={ user.name.given }
                                disabled
                            />
                        </Grid>
                        <Grid item xs={ 6 }>
                            <TextField
                                variant="outlined"
                                label="Last Name"
                                fullWidth
                                value={ user.name.family }
                                disabled
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <TextField
                                variant="outlined"
                                label="Email"
                                fullWidth
                                value={ user.email }
                                disabled
                            />
                        </Grid>
                    </Grid>
                    <TechnicianProfile />
                </Grid>
            </Grid>
        </Grid>
    );
}