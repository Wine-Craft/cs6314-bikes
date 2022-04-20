import axios from "axios";
import React, {useContext, useEffect, useState} from 'react';

import Grid from "@mui/material/Grid";

import SessionContext from '../session/context';
import generateURL from "../utils/url-generator";
import TechnicianCard from "./card";
import Box from "@mui/material/Box";

export default function BrowseTechniciansPage() {
    const { getBearerToken, invalidateToken } = useContext(SessionContext);
    const [ technicians, setTechnicians ] = useState([]);

    async function downloadTechnicians() {
        const url = generateURL('/technicians/');
        const response = await axios.get(url, {
            headers: {
                ...getBearerToken(),
            },
        });

        if(response.status === 200) {
            const technicians = response.data.technicians;
            setTechnicians(technicians);
        } else if(response.status === 401) {
            return invalidateToken();
        }
    }

    useEffect(() => {
        downloadTechnicians();
    }, []);

    console.log(technicians);

    return (
        <Grid m={ 3 }>
            <Box sx={{
                display: 'flex',
                gap: 2,
            }}> { technicians.map((technician) => (
                <Box key={ technician._id }>
                    <TechnicianCard technician={ technician }/>
                </Box>
            ))} </Box>
        </Grid>
    );
}