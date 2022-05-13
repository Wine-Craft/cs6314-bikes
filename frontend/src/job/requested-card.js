import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Skill from "../skills/skill";
import React from "react";
import {CardActions} from "@mui/material";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

export default function RequestedCard({
    job,
    onAccept,
    onCancel,
}) {
    console.log(job);
    const technician = job.technician;
    const email = technician.email;
    const fullName = `${ technician.name.given } ${ technician.name.family }`;
    const imageURL = technician.imageURL;

    return (
        <Card>
            <CardContent m={ 1 }>
                <Grid container>
                    <Grid item xs={ 12 }>
                        <Typography variant="h6">
                            { job.title } { job.price != null ? `$${ job.price }` : '' }
                        </Typography>
                    </Grid>
                    <Grid item xs={ 12 }>
                        <Typography variant="body1">
                            { job.description }
                        </Typography>
                    </Grid>
                    <Grid item xs={ 12 }>
                        <Box sx={{
                            display: 'flex',
                            overflowX: 'scroll',
                            gap: 0.5,
                            mt: 1,
                        }}>
                            <>{ job.tags.map((tag) => (
                                <Box sx={{
                                }} key={ tag._id }>
                                    <Skill
                                        skill={ tag }
                                    />
                                </Box>
                            ))}</>
                        </Box>
                    </Grid>

                    <Grid item xs={ 12 }>

                        <Avatar src={ imageURL } sx={{
                            width: 40,
                            height: 40,
                        }}/>
                        <Typography variant="body2">
                            Request for { fullName } - { email }
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <> { !job.canceled && !job.finished &&
                    <>
                        <> { job.accepted &&
                            <Button disabled>
                                No pending actions
                            </Button>
                        } { !job.accepted && job.price != null &&
                            <Button onClick={ () => onAccept(job._id) }>
                                Accept
                            </Button>
                        } {!job.accepted && job.price == null &&
                            <Button disabled>
                                Awaiting Price
                            </Button>
                        } </>
                        <Button onClick={ () => onCancel(job._id) }>
                            Cancel
                        </Button>
                    </>
                } { job.canceled &&
                    <Button disabled>
                        Canceled
                    </Button>
                } { job.finished &&
                    <Button disabled>
                        Finished
                    </Button>
                } </>

            </CardActions>
        </Card>
    );
}