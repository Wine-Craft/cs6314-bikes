import React, { useContext } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

import Menubar from './menu/bar';
import LoginPage from "./login/page";
import LogoutPage from "./login/logout";
import SessionContext from './session/context';

function App() {
    const { loading, logged_in } = useContext(SessionContext);
    return (
        <React.Fragment> { !loading &&
            <Routes>
                <Route exact path="/" element={
                    <div>
                        Information page
                    </div>
                } />
                <Route path="/login" element={ logged_in ?
                    <Navigate to="/home" /> :
                    <LoginPage />
                } />
                <Route path="/logout" element={ <LogoutPage /> } />
                <Route path="/" element={ logged_in ?
                    <Menubar /> :
                    <Navigate to="/login" />
                }>
                    <Route path="/home" element={
                        <div>
                            Home
                        </div>
                    } />
                </Route>
            </Routes>
        } { loading &&
            <div>
            </div>
        } </React.Fragment>
    );
}

export default App;
