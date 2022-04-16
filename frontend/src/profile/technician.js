import React, {useContext, useEffect, useState} from 'react';
import SessionContext from "../session/context";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import generateURL from "../utils/url-generator";

export default function TechnicianProfile() {
    const { isTechnician, getBearerToken } = useContext(SessionContext);

    const [ skills, setSkills ] = useState([]);
    const [ aboutMe, setAboutMe ] = useState('');
    const [ services, setServices ] = useState([]);

    async function loadTechnicianProfile() {
        const url = generateURL('/technicians/profile');
        const response = await axios.get(url, {
            headers: getBearerToken(),
        });

        if(response.status === 200) {
            const data = response.data;
            const technician = data.technician;
            console.log(technician);

            setSkills(technician.skills);
            setAboutMe(technician.aboutMe);
            setServices(technician.services);
        } else {

        }
    }

    useEffect(() => {
        loadTechnicianProfile();
    }, [ isTechnician ]);

    return (
        <> { isTechnician &&
            <>
                <Typography variant="h4">Technician Profile</Typography>
                <Grid mt={ 0 } container spacing={ 3 }>
                    <Grid item xs={ 12 }>
                        <TextField
                            variant="outlined"
                            label="About Me"
                            multiline
                            fullWidth
                            value={ aboutMe }
                        />
                    </Grid>
                </Grid>
            </>
        } { !isTechnician &&
            <Button>Become a Technician</Button>
        } </>
    );
}