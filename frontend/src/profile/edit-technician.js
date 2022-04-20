import axios from "axios";
import React, {useContext, useEffect, useState} from 'react';

import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from '@mui/lab/LoadingButton';

import SkillsPicker from "../skills/picker";
import ServicesInput from "../services/input";
import SessionContext from "../session/context";
import generateURL from "../utils/url-generator";
import {useSearchParams} from "react-router-dom";
import Avatar from "@mui/material/Avatar";

export default function EditTechnicianProfilePage() {
    const [ searchParams ] = useSearchParams();

    const { getBearerToken, invalidateToken, user} = useContext(SessionContext);

    const [ technician, setTechnician ] = useState(false);
    const [ becoming, setBecoming ] = useState(false);
    const [ self, setSelf ] = useState(false);

    const [ name, setName ] = useState({
        given: '',
        family: '',
    });
    const [ imageURL, setImageURL ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ skills, setSkills ] = useState([]);
    const [ aboutMe, setAboutMe ] = useState('');
    const [ services, setServices ] = useState([]);
    const [ changed, setChanged ] = useState(false);
    const [ saving, setSaving ] = useState(false);
    const [ saved, setSaved ] = useState(false);

    const [ skillsError, setSkillsError ] = useState(false);
    const [ aboutMeError, setAboutMeError ] = useState(false);
    const [ servicesError, setServicesError ] = useState({});
    const [ error, setError ] = useState(false);

    async function loadTechnicianProfile(id) {
        let url = generateURL('/technicians/profile');
        if(id != null) {
            url = generateURL(`/technicians/profile?id=${ id }`);
            console.log(url);
        }

        const response = await axios.get(url, {
            headers: getBearerToken(),
        });

        if(response.status === 200) {
            const data = response.data;
            const technician = data.technician;

            const skillIDs = [];
            for(const skill of technician.skills) {
                skillIDs.push(skill._id);
            }

            setTechnician(true);
            setName(technician.name);
            setEmail(technician.email);
            setImageURL(technician.imageURL);
            setSkills(skillIDs);
            setAboutMe(technician.aboutMe);
            setServices(technician.services);
            if(technician.userID === user._id) {
                setSelf(true);
            }
        } else if(response.status === 401) {
            return invalidateToken();
        } else if(response.status === 404) {
            setName(user.name);
            setEmail(user.email);
            setImageURL(user.imageURL);
            setSkills([]);
            setAboutMe('');
            setServices([]);
        }
        setBecoming(false);
        setChanged(false);
        setSaving(false);
        setSaved(false);
    }

    async function handleSave() {
        setSaving(true);
        setSkillsError(false);
        setAboutMeError(false);
        setServicesError([]);
        setError(false);

        const url = generateURL('/technicians/profile');
        const response = await axios.post(url, {
            skills: skills,
            about_me: aboutMe,
            services: services,
            range: 5000,
            location: {
                longitude: 0,
                latitude: -1,
            }
        }, {
            headers: getBearerToken(),
        });

        setSaving(false);
        if(response.status === 200) {
            setSaved(true);
            setChanged(false);
        } else if(response.status === 422) {
            const errors = response.data.errors;
            const servicesError = {};
            for(const error of errors) {
                const param = error.param.split(/\[([0-9]*)\]|\./gm)[0];
                if(param === 'services') {
                    const regex = /\[([0-9]*)\]\.(.*)/gm;
                    const matches = regex.exec(error.param);
                    const index = matches[1];
                    if(!servicesError[index]) {
                        servicesError[index] = [];
                    }
                    servicesError[index].push(matches[2]);
                } else if(param === 'about_me') {
                    setAboutMeError(true);
                } else if(param === 'skills') {
                    setSkillsError(true);
                }
            }
            setServicesError(servicesError);
        } else if(response.status === 401) {
            return invalidateToken();
        } else {
            setError(true);
        }
    }

    function handleSetSkills(skills) {
        if(self) {
            setSkills(skills);
            setChanged(true);
        }
    }

    function handleSetAboutMe(aboutMe) {
        if(self) {
            setAboutMe(aboutMe);
            setChanged(true);
        }
    }

    function handleSetServices(services) {
        if(self) {
            setServices(services);
            setChanged(true);
        }
    }

    useEffect(() => {
        const id = searchParams.get("id");
        loadTechnicianProfile(id);
    }, [ searchParams.get('id') ]);

    useEffect(() => {
        if(saved === true) {
            const savedTimeout = setTimeout(() => {
                setSaved(false);
            }, 3000);
            return () => {
                clearTimeout(savedTimeout);
            };
        }
    }, [ saved ]);

    return (

        <Grid m={ 3 }>
            <Grid container
                  alignItems="center"
                  justifyContent="center"
            >
                <Grid item xs={ 12 } sm={ 10 } md={ 8 } lg={ 6 }>
                    <Avatar
                        src={ imageURL }
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
                                value={ name.given }
                                disabled
                            />
                        </Grid>
                        <Grid item xs={ 6 }>
                            <TextField
                                variant="outlined"
                                label="Last Name"
                                fullWidth
                                value={ name.family }
                                disabled
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <TextField
                                variant="outlined"
                                label="Email"
                                fullWidth
                                value={ email }
                                disabled
                            />
                        </Grid>
                    </Grid>
                    <> { (technician || becoming) &&
                        <>
                            <Snackbar
                                open={ changed }
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                            >
                                <Alert severity="info" action={
                                    <LoadingButton
                                        color="inherit"
                                        size="small"
                                        onClick={ handleSave }
                                        loading={ saving }
                                    >
                                        Save
                                    </LoadingButton>
                                }>
                                    You have some unsaved changes.
                                </Alert>
                            </Snackbar>
                            <Snackbar
                                open={ saved }
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                            >
                                <Alert severity="success">
                                    Successfully saved changes
                                </Alert>
                            </Snackbar>
                            <Snackbar
                                open={ error }
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                            >
                                <Alert severity="error">
                                    There was a problem saving your profile. Try again.
                                </Alert>
                            </Snackbar>
                            <Typography variant="h4">Technician Profile</Typography>
                            <Grid mt={ 0 } container spacing={ 3 }>
                                <Grid item xs={ 12 }>
                                    <TextField
                                        variant="outlined"
                                        label="About Me"
                                        multiline
                                        fullWidth
                                        helperText={ aboutMeError ? 'Must be at least 10 characters long' : '' }
                                        error={ aboutMeError }
                                        value={ aboutMe }
                                        onChange={ (e) => {
                                            handleSetAboutMe(e.target.value)
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={ 12 }>
                                    <SkillsPicker
                                        error={ skillsError }
                                        selected={ skills }
                                        setSelected={ handleSetSkills }
                                    />
                                </Grid>
                                <Grid item xs={ 12 }>
                                    <ServicesInput
                                        addable={ self }
                                        errors={ servicesError }
                                        services={ services }
                                        setServices={ handleSetServices }
                                    />
                                </Grid>
                            </Grid>
                        </>
                    } { !technician && !becoming &&
                        <Button onClick={ () => setBecoming(true) }>Become a Technician</Button>
                    } </>
                </Grid>
            </Grid>
        </Grid>
    );
}