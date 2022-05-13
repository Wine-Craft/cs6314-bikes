import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {useContext, useEffect, useState} from "react";
import generateURL from "../utils/url-generator";
import SessionContext from "../session/context";
import axios from "axios";
import RequestedCard from "./requested-card";
import Typography from "@mui/material/Typography";
import TechnicianCard from "./technician-card";

export default function JobPage() {
    const { getBearerToken, invalidateToken } = useContext(SessionContext);

    const [ requested, setRequested ] = useState([]);
    const [ technician, setTechnician ] = useState([]);

    async function loadRequested() {
        const url = generateURL('/jobs/requestor');
        const response = await axios.get(url, {
            headers: getBearerToken(),
        });

        if(response.status === 200) {
            setRequested(response.data.jobs);
        } else if(response.status === 401) {
            return invalidateToken();
        } else {
            return alert("Failed to load!");
        }
    }

    async function loadTechnician() {
        const url = generateURL('/jobs/technician');
        const response = await axios.get(url, {
            headers: getBearerToken(),
        });

        if(response.status === 200) {
            setTechnician(response.data.jobs);
        } else if(response.status === 401) {
            return invalidateToken();
        } else {
            return alert("Failed to load!");
        }
    }

    async function handleAccept(id) {
        const url = generateURL('/jobs/accept');
        const response = await axios.post(url, {
            id: id,
            accepted: true,
        }, {
            headers: getBearerToken(),
        });

        if(response.status === 200) {
            window.location.reload();
        } else if(response.status === 401) {
            return invalidateToken();
        } else {
            return alert("Failed to load!");
        }
    }

    async function handlePriceSet(id) {
        const price = prompt("Price:");
        const url = generateURL('/jobs/set-price');
        const response = await axios.post(url, {
            id: id,
            price: price,
        }, {
            headers: getBearerToken(),
        });

        if(response.status === 200) {
            window.location.reload();
        } else if(response.status === 401) {
            return invalidateToken();
        } else {
            return alert("Failed to load!");
        }
    }

    async function handleCancel(id) {
        const url = generateURL('/jobs/accept');
        const response = await axios.post(url, {
            id: id,
            accepted: false,
        }, {
            headers: getBearerToken(),
        });

        if(response.status === 200) {
            window.location.reload();
        } else if(response.status === 401) {
            return invalidateToken();
        } else {
            return alert("Failed to load!");
        }

    }

    async function handleFinish(id) {
        const url = generateURL('/jobs/finish');
        const response = await axios.post(url, {
            id: id,
        }, {
            headers: getBearerToken(),
        });

        if(response.status === 200) {
            window.location.reload();
        } else if(response.status === 401) {
            return invalidateToken();
        } else {
            return alert("Failed to load!");
        }
    }


    useEffect(() => {
        loadRequested();
        loadTechnician();
    }, []);

    return (
        <Grid m={ 3 }>
            <Grid container>
                <Grid item xs={ 12 }>
                    <Typography variant="h4">
                        Requested Jobs
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                    }}> { requested.map(job => (
                        <RequestedCard
                            key={ job._id }
                            job={ job }
                            onAccept={ handleAccept }
                            onCancel={ handleCancel }
                        />
                    ))} </Box>
                </Grid>
                <Grid item xs={ 12 } mt={ 3}>
                    <Typography variant="h4">
                        Technician Jobs
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                    }}> { technician.map(job => (
                        <TechnicianCard
                            key={ job._id }
                            job={ job }
                            onPriceSet={ handlePriceSet }
                            onFinish={ handleFinish }
                        />
                    ))} </Box>
                </Grid>
            </Grid>
        </Grid>
    );
}