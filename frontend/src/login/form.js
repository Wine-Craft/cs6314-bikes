import axios from 'axios';
import React, {useContext, useState} from 'react';
import GoogleLogin from "react-google-login";
import GoogleButton from 'react-google-button';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LinearProgress from "@mui/material/LinearProgress";

import '../styles/login.css';
import SessionContext from '../session/context';
import generateURL from "../utils/url-generator";

function LoginForm() {
    const { setToken } = useContext(SessionContext);
    const [ email, setEmail ] = useState('jnormantransactions@gmail.com');
    const [ password, setPassword ] = useState('1234');

    const [ loading, setLoading ] = useState(false);
    const [ errorMsg, setErrorMsg ] = useState(null);

    async function onLoginClick() {
        setLoading(true);
        setErrorMsg(null);
        const url = generateURL('/auth/local/login');
        const response = await axios.post(url, {
            username: email,
            password: password,
        });
        setLoading(false);
        if(response.status === 200) {
            const jwt_token = response.data.token;
            setToken(jwt_token);
        } else if(response.status === 401) {
            setErrorMsg("Incorrect email/password combination");
        } else {
            setErrorMsg("Server error, try again later.");
        }
    }

    async function onGoogleSuccess(response) {
        setLoading(true);
        setErrorMsg(null);
        const access_token = response.accessToken;
        const url = generateURL('/auth/google/login');
        const postResponse = await axios.post(url, {
            access_token: access_token,
        });
        setLoading(false);
        if(postResponse.status === 200) {
            const jwt_token = postResponse.data.token;
            setToken(jwt_token);
        } else if(postResponse.status === 401) {
            setErrorMsg("Invalid Google Login. You might already have an email/password combo.");
        } else {
            setErrorMsg("Server error, try again later.");
        }
    }

    const disabled = loading;
    return (
        <Card sx={{
            p: 3,
            maxWidth: '400px',
            margin: 'auto',
        }}>
            <Typography variant="h5" mb={ 2 }>
                Sign in to UTD Bikes
            </Typography>
            <> { loading &&
                <LinearProgress />
            } { !loading &&
                <Box sx={{
                    height: '4px',
                }} />
            } </>
            <Box sx={{
                my: 2,
            }}>
                <TextField
                    variant="outlined"
                    label="Email"
                    style={{
                        width: '100%',
                    }}
                    disabled={ disabled }
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
                    disabled={ disabled }
                    value={ password }
                    onChange={ (e) => setPassword(e.target.value) }
                />
            </Box>
            <Box sx={{
                my: 2,
            }}>
                <Button
                    variant="contained"
                    className="login-button"
                    onClick={ onLoginClick }
                    disabled={ disabled }
                >
                    Login
                </Button>
            </Box>
            <Divider><Typography variant="button"> or </Typography></Divider>
            <Box sx={{
                mt: 2,
            }}>
                <GoogleLogin
                    type="filled"
                    clientId={ process.env.REACT_APP_GOOGLE_CLIENT_ID }
                    buttonText="Sign in with Google"
                    className="login-button"
                    disabled={ disabled }
                    onSuccess={ onGoogleSuccess }
                    onFailure={ (err) => {
                        setLoading(false);
                    }}
                    render={renderProps => (
                        <GoogleButton
                            style={{
                                width: '100%',
                            }}
                            onClick={ () => {
                                renderProps.onClick();
                                setLoading(true);
                            }}
                            disabled={renderProps.disabled}
                        >Sign in with google</GoogleButton>
                    )}
                />
            </Box>
        </Card>
    );
}

export default LoginForm;