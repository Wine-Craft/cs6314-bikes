import axios from 'axios';
import React, {useEffect, useState} from 'react';

import LoginForm from './form';
import generateURL from "../utils/url-generator";

export default function LoginPage() {
    const [ authenticated, setAuthenticated ] = useState(false);

    async function getMe() {
        const url = generateURL('/auth/me');
        const response = await axios.get(url);
        const data = response.data;
        console.log(response, data);
    }

    useEffect(() => {
        getMe();
    }, []);

    return (
        <div>
            <div>
                TEST
            </div>
            <LoginForm />
        </div>
    );
}