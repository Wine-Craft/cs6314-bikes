import React from 'react';

export default React.createContext({
    loading: true,
    logged_in: false,
    user: null,
    setToken: (token) => {;},
    invalidateToken: () => {;},
    getBearerToken: () => {},
});