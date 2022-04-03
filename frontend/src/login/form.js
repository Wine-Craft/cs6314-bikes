import axios from 'axios';
import React, {useState} from 'react';
import GoogleLogin from "react-google-login";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import '../styles/login.css';
import generateURL from "../utils/url-generator";

function LoginForm() {
    const [ email, setEmail ] = useState('jnormantransactions@gmail.com');
    const [ password, setPassword ] = useState('1234');

    async function onLoginClick() {
        const url = generateURL('/auth/local/login');
        const response = await axios.post(url, {
            username: email,
            password: password,
        });
        console.log(response.data);
    }

    async function onGoogleSuccess(response) {
        const access_token = response.accessToken;
        const url = generateURL('/auth/google/login');
        const postResponse = await axios.post(url, {
            access_token: access_token,
        });
        console.log(postResponse.data);
    }

    return (
        <Box sx={{
            maxWidth: 350,
        }}>
            <Card sx={{
                p: 3,
            }}>
                <Typography variant="h6">
                    Sign In
                </Typography>
                <Box sx={{
                    my: 1,
                }}>
                    <TextField
                        variant="outlined"
                        label="Email"
                        style={{
                            width: '100%',
                        }}
                        value={ email }
                        onChange={ (e) => setEmail(e.target.value) }
                    />
                </Box>
                <Box sx={{
                    my: 1,
                }}>
                    <TextField
                        variant="outlined"
                        label="Password"
                        type="password"
                        style={{
                            width: '100%',
                        }}
                        value={ password }
                        onChange={ (e) => setPassword(e.target.value) }
                    />
                </Box>
                <Box sx={{
                    my: 3,
                }}>
                    <Button
                        variant="contained"
                        className="login-button"
                        onClick={ onLoginClick }
                    >
                        Login
                    </Button>
                </Box>
                <Divider> or </Divider>
                <Box sx={{
                    mt: 3,
                }}>
                    <GoogleLogin
                        clientId={ process.env.REACT_APP_GOOGLE_CLIENT_ID }
                        buttonText="Sign in with Google"
                        className="login-button"
                        onSuccess={ onGoogleSuccess }
                        onFailure={ (err) => {
                            console.log(err);
                        }}
                    />
                </Box>
            </Card>
        </Box>
    );
}

export default LoginForm;