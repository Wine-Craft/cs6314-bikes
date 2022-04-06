import axios from "axios";
import Cookies from 'universal-cookie';
import React, { useState, useEffect } from 'react';

import SessionContext from './context';
import generateURL from "../utils/url-generator";

export default function Provider({
    children,
}) {
    const [ loading, setLoading ] = useState(true);
    const [ isLoggedIn, setLoggedIn ] = useState(false);
    const [ isTechnician, setIsTechnician ] = useState(false);
    const [ isAdmin, setIsAdmin ] = useState(false);
    const [ token, setToken ] = useState(null);
    const [ user, setUser ] = useState(null);
    const [ cookies ] = useState(new Cookies());

    async function loadToken() {
        const token = cookies.get('jwt_token');
        if(token) {
            return setToken(token);
        }
        setIsTechnician(false);
        setLoggedIn(false);
        setIsAdmin(false);
        setLoading(false);
        setUser(null);
        setToken(null);
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
        setIsTechnician(false);
        setLoggedIn(false);
        setIsAdmin(false);
        setUser(null);
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
        setLoading(true);
        const url = generateURL('/auth/me');
        const response = await axios.get(url, {
            headers: {
                ...getBearerToken(),
            },
        });
        if(response.status === 200) {
            const user = response.data.user;
            setIsTechnician(Boolean(user.isTechnician));
            setIsAdmin(Boolean(user.isAdmin));
            setLoggedIn(true);
            setUser(user);
        } else if(response.status === 401) {
            invalidateToken();
        }
        setLoading(false);
    }

    useEffect(() => {
        // initialize
        loadToken();
    }, []);

    useEffect(() => {
        if(token != null) {
            downloadMe();
        }
    }, [ token ]);

    return (
        <SessionContext.Provider value={{
            loading: loading,
            isLoggedIn: isLoggedIn,
            isTechnician: isTechnician,
            isAdmin: isAdmin,
            user: user,
            setToken: storeToken,
            invalidateToken: invalidateToken,
            getBearerToken: getBearerToken,
        }}>
            { children }
        </SessionContext.Provider>
    )
}