import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

import Menubar from './menu/bar';
import LoginPage from "./login/page";
import LogoutPage from "./login/logout";
import CreateJobPage from "./job/create-page";
import SessionContext from './session/context';
import BrowseTechniciansPage from "./profile/browse";
import EditTechnicianProfilePage from "./profile/edit-technician";
import JobList from "./job/page";

function App() {
    const { loading, isLoggedIn, invalidateToken } = useContext(SessionContext);

    return (
        <React.Fragment> { !loading &&
            <Routes>
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
                    <Route path="/create-job" element={ <CreateJobPage /> } />
                    <Route path="/browse-technicians" element={ <BrowseTechniciansPage /> } />
                    <Route path="/profile" element={ <EditTechnicianProfilePage /> } />
                    <Route path="/jobs" element={ <JobList /> } />
                </Route>
            </Routes>
        } { loading &&
            <div>
            </div>
        } </React.Fragment>
    );
}

export default App;
