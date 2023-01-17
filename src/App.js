import PersonList from './components/PersonList';
import './App.css';
import Profile from "./components/Profile/Profile";
import PersonAdd from './components/PersonAdd';
// import Accueil from './components/Accueil';
import Login from './components/login/Login';
import Booking from './components/booking/Booking';
import {Routes, Route, Navigate} from "react-router-dom";
import Footer from './components/Footer';
import Navbar from './components/NavBar';
import React from 'react';
import SignUp from './components/PersonAdd';
import { useState } from 'react';
import { getToken } from "./components/helpers";
import { getPizzas } from "./components/helpers";
import SelectedPizza  from './components/SelectedPizza/SelectedPizza';
import Planning  from './components/planning/Planning';
import PlanningV2  from './components/planning/PlanningV2';
import Dsp_Planning  from './components/Display_planning';
import Accueil from './components/accueil/Accueil';
import ForgotPassword from './components/auth/ForgotPassword';
import Validation from './components/validation/Validation';

function App() {
    
    return (

        <div className="App">
            <React.Fragment>
                <Navbar />
            </React.Fragment>

            <Routes>
                <Route path="/reservation" element={<Dsp_Planning />} />
                <Route path="/planningV2" element={<PlanningV2 />} />
                <Route
                 path="/planning"
                // element={<Planning />}
                // console log getPizzas()
            
                 element={getPizzas() ? <Planning /> : <Navigate to="/Pizzas" />}
                 />
                <Route path="/Pizzas" element={<SelectedPizza />} />

                <Route path="/inscription" element={<SignUp />} />
                <Route
                    path="/profile"
                    element={getToken() ? <Profile /> : <Navigate to="/connexion" />}
                />
                <Route path='/connexion' element={<Login />} />
                <Route path="/list" element={<PersonList />} />
                <Route path="/reservation" element={<Booking />} />
                <Route path='/' element={<Accueil />} />
                <Route path='/reset' element={<ForgotPassword />} />
                <Route path='/validation' element={<Validation />} />
            </Routes>

        </div>

    );
}

export default App;
