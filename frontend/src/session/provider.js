import axios from "axios";
import Cookies from 'universal-cookie';
import React, { useState, useEffect } from 'react';

import SessionContext from './context';
import generateURL from "../utils/url-generator";

export default function Provider({
    children,
}) {
    const [ loading, setLoading ] = useState(true);
    const [ logged_in, setLoggedIn ] = useState(false);
    const [ token, setToken ] = useState(null);
    const [ user, setUser ] = useState(null);
    const [ cookies ] = useState(new Cookies());

    function loadToken() {
        const token = cookies.get('jwt_token')
        setToken(token)
        return token;
    }

    function storeToken(token) {
        setToken(token);
        cookies.remove('jwt_token');
        let d = new Date();
        d.setTime(d.getTime() + (1*60*60*1000));
        cookies.set("jwt_token", token, {
            expires: d,
        });
    }

    function invalidateToken() {
        setToken(null);
        cookies.remove('jwt_token');
    }

    function getBearerToken() {
        if(token != null) {
            return {
                'Authorization': `Bearer ${ token }`,
            }
        }
        return {};
    }

    async function downloadMe() {
        const url = generateURL('/auth/me');
        const response = await axios.get(url, {
            headers: {
                ...getBearerToken(),
            },
        });
        if(response.status === 200) {
            const user = response.data.user;
            setLoggedIn(true);
            setUser(user);
            setLoading(false);
        } else if(response.status === 401) {
            invalidateToken();
        }
    }

    useEffect(() => {
        // initialize
        setLoading(true);
        loadToken();
    }, []);

    useEffect(() => {
        setLoading(true);
        if(token != null) {
            downloadMe();
        } else {
            setLoggedIn(false);
            setUser(null);
            setLoading(false);
        }
    }, [ token ]);

    return (
        <SessionContext.Provider value={{
            loading: loading,
            logged_in: logged_in,
            user: user,
            setToken: storeToken,
            invalidateToken: invalidateToken,
            getBearerToken: getBearerToken,
        }}>
            { children }
        </SessionContext.Provider>
    )
}