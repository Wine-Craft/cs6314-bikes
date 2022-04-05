import React from 'react';

export default React.createContext({
    loading: true,
    isLoggedIn: false,
    isTechnician: false,
    isAdmin: false,
    user: null,
    setToken: (token) => {;},
    invalidateToken: () => {;},
    getBearerToken: () => {},
});