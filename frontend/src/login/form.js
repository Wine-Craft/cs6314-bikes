import React from 'react';
import GoogleLogin from "react-google-login";

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function LoginPage() {
    return (
        <Box sx={{
            width: 300,
        }}>
            <Card>
                <Box sx={{
                    m: 3,
                }}>
                    <TextField
                        variant="standard"
                        label="Email"
                        required={ true }
                        style={{
                            width: '100%',
                        }}
                    />
                </Box>
                <Box sx={{
                    m: 3,
                }}>
                    <TextField
                        variant="standard"
                        label="Password"
                        type="password"
                        required={ true }
                        style={{
                            width: '100%',
                        }}
                    />
                </Box>
                <Box sx={{
                    m: 3,
                }}>
                    <GoogleLogin
                        clientId={ process.env.REACT_APP_GOOGLE_CLIENT_ID }
                        buttonText="Sign in with Google"
                    />
                </Box>
            </Card>
        </Box>
    );
}

export default LoginPage;