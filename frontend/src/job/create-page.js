import React, {useContext, useState} from 'react';
import Grid from "@mui/material/Grid";
import SkillsPicker from "../skills/picker";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSearchParams, useNavigate } from 'react-router-dom'
import generateURL from "../utils/url-generator";
import SessionContext from "../session/context";
import axios from "axios";


export default function CreateJobPage() {
    const [ searchParams ] = useSearchParams();
    const navigate = useNavigate();
    const { getBearerToken, invalidateToken } = useContext(SessionContext);


    const technician_id = searchParams.get('id');
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ skills, setSkills ] = useState([]);

    async function handleSubmit() {
        const url = generateURL('/jobs');
        const response = await axios.post(url, {
            title: title,
            technician_id: technician_id,
            description: description,
            tags: skills,
        }, {
            headers: getBearerToken(),
        });

        if(response.status === 200) {
            navigate('/jobs');
        } else if(response.status === 401) {
            return invalidateToken();
        } else {
            alert("Error submitting job");
        }
    }

    return (
        <Grid m={ 3 }>
            <Grid container
                  alignItems="center"
                  justifyContent="center"
            >
                <Grid item xs={ 12 }>
                    <Typography variant="h4">
                        Create Job
                    </Typography>
                </Grid>
                <Grid item xs={ 12 } m={ 1 }>
                    <TextField
                        variant="outlined"
                        label="Title"
                        fullWidth
                        value={ title }
                        onChange={ e => setTitle(e.target.value) }
                    />
                </Grid>
                <Grid item xs={ 12 } m={ 1 }>
                    <TextField
                        variant="outlined"
                        label="Description"
                        fullWidth
                        value={ description }
                        onChange={ e => setDescription(e.target.value) }
                    />
                </Grid>
                <Grid item xs={ 12 } m={1}>
                    <SkillsPicker
                        selected={ skills }
                        setSelected={ setSkills }
                    />
                </Grid>
                <Grid item xs={ 12 }>
                    <Button onClick={ handleSubmit } variant="contained">
                        Create Job
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}