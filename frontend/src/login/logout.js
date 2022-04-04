import React, {useContext, useEffect} from "react";
import { Navigate } from 'react-router-dom';

import SessionContext from '../session/context';

export default function Logout() {
    const { logged_in, invalidateToken } = useContext(SessionContext);

    useEffect(() => {
        invalidateToken();
    }, []);

    return (
        <React.Fragment> { !logged_in &&
            <Navigate to="/login" />
        } </React.Fragment>
    );
}