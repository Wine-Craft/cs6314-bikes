import axios from 'axios';
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import React, {useEffect, useState} from 'react';
import { useTheme } from '@mui/material/styles';

import LoginForm from './form';
import generateURL from "../utils/url-generator";
import {getBearerToken} from "../utils/jwt-store";

import bikePNG from '../images/bicycle.png';

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
            <Grid item xs={ 12 } zIndex={ 10 }>
                <LoginForm />
            </Grid>
            <Box
                position="absolute"
                width={600}
                height={360}
                right={25}
                bottom={25}
                style={{
                    zIndex: 1,
                    backgroundImage: `url(${bikePNG}`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                }}
            />
        </Grid>
    );
}

export default LoginPage;