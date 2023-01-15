import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router, Switch, Route, Routes} from "react-router-dom";
import MultipleChoice from './components/MultipleChoice.js';

const Routing = () => {
    return (
        <div style={{backgroundColor: 'black', height: '100vh'}}>
            <Router>
                <Routes>
                    <Route exact path='/' element={<App/>}/>
                    <Route path='/student' element={<MultipleChoice/>}/>
                </Routes>
            </Router>
        </div>
    )
}


ReactDOM.render(
    <React.StrictMode>
        <Routing/>
    </React.StrictMode>,
    document.getElementById('root')
);