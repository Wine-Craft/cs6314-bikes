import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

import Menubar from './menu/bar';
import LoginPage from "./login/page";
import LogoutPage from "./login/logout";
import SessionContext from './session/context';
import ProfilePage from "./profile/page";

function App() {
    const { loading, isLoggedIn, invalidateToken } = useContext(SessionContext);

    return (
        <React.Fragment> { !loading &&
            <Routes>
                <Route exact path="/" element={
                    <div>
                        Information page
                    </div>
                } />
                <Route path="/login" element={ isLoggedIn ?
                    <Navigate to="/home" /> :
                    <LoginPage />
                } />
                <Route path="/logout" element={ <LogoutPage /> } />
                <Route path="/" element={ isLoggedIn ?
                    <Menubar /> :
                    <Navigate to="/login" />
                }>
                    <Route path="/home" element={
                        <div>
                            Home
                        </div>
                    } />
                    <Route path="/profile" element={ <ProfilePage /> } />
                </Route>
            </Routes>
        } { loading &&
            <div>
            </div>
        } </React.Fragment>
    );
}

export default App;
