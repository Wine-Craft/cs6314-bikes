import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Skill from "../skills/skill";
import React from "react";
import {CardActions, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

export default function TechnicianCard({
    job,
    onPriceSet,
    onFinish,
}) {

    const requestor = job.requestor;
    const email = requestor.email;
    const fullName = `${ requestor.name.given } ${ requestor.name.family }`;
    const imageURL = requestor.imageURL;

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
                            Requested by { fullName } - { email }
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <> {!job.canceled && !job.finished &&
                    <> { job.price == null &&
                        <Button onClick={ () => onPriceSet(job._id) }>
                            Set Price
                        </Button>
                    } { !job.accepted && job.price != null &&
                        <Button disabled>
                            No pending actions
                        </Button>
                    } { job.accepted &&
                        <Button onClick={ () => onFinish(job._id) }>
                            Finish Job
                        </Button>
                    } </>
                } { job.canceled &&
                    <Button disabled> Canceled </Button>
                } { job.finished &&
                    <Button disabled> Finished </Button>
                } </>
            </CardActions>
        </Card>
    );
}