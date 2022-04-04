import axios from 'axios';
import Grid from '@mui/material/Grid';
import React, {useEffect, useState} from 'react';
import { useTheme } from '@mui/material/styles';

import LoginForm from './form';
import generateURL from "../utils/url-generator";
import {getBearerToken} from "../utils/jwt-store";

function LoginPage() {
    const theme = useTheme();
    const [ authenticated, setAuthenticated ] = useState(false);

    async function getMe() {
        const url = generateURL('/auth/me');
        const response = await axios.get(url, {
            headers: {
                ...getBearerToken()
            },
        });
        if(response.status === 200) {
            const data = response.data;
            console.log(data);
        } else if(response.status === 401) {
            console.log("Not logged in!");
        }
    }

    useEffect(() => {
        getMe();
    }, []);

    return (
        <Grid
            container
            p={ 3 }
            height={ '100vh' }
            justifyContent="center"
            alignItems="center"
            backgroundColor={ theme.palette.primary.light }
        >
            <Grid item xs={ 12 }>
                <LoginForm />
            </Grid>
        </Grid>
    );
}

export default LoginPage;