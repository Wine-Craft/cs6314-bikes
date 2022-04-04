import { Routes, Route } from 'react-router-dom';

import Menubar from './menu/bar';
import LoginPage from "./login/page";

function App() {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={
                    <div>
                        Information page
                    </div>
                } />
                <Route path="/login" element={ <LoginPage /> } />
                <Route path="/" element={ <Menubar /> }>
                    <Route path="/home" element={
                        <div>
                            Home
                        </div>
                    } />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
