import PersonList from './components/PersonList';
import './App.css';
import Profile from "./components/Profile/Profile";
// import PersonAdd from './components/PersonAdd';
// import Accueil from './components/Accueil';
import Login from './components/login/Login';
import Booking from './components/booking/Booking';
import {Routes, Route, Navigate} from "react-router-dom";
// import Footer from './components/Footer';
import Navbar from './components/NavBar';
import React from 'react';
import SignUp from './components/PersonAdd';
// import { useState } from 'react';
import { getToken } from "./components/helpers";
import { getPizzas } from "./components/helpers";
import { getRole } from "./components/helpers";
import SelectedPizza  from './components/SelectedPizza/SelectedPizza';
import Planning  from './components/planning/Planning';
import PlanningV2  from './components/planning/PlanningV2';
import Dsp_Planning  from './components/Display_planning';
import Accueil from './components/accueil/accueil';
import ForgotPassword from './components/auth/ForgotPassword';
import Validation from './components/validation/Validation';
import Carte from './components/carte/Carte';
import Panier from './components/panier/Panier';
import Planification from './components/planification/Planification';

function App() {
    
    return (

        <div className="App">
            <React.Fragment>
                <Navbar />
            </React.Fragment>

            <Routes>
                {/* <Route path="/planningV2" element={<PlanningV2 />} /> */}

                {/* IF NOT ADMINISTRATEUR HE NOT ACCESS TO THIS ROUTE */}
                <Route 
                    path="/reservation" 
                    element={getRole() === "administrateur" ? <Dsp_Planning /> : <Navigate to="/"/>}
                />

                <Route 
                    path="/Pizzas" 
                    element={getRole() === "administrateur" ? <SelectedPizza /> : <Navigate to="/"/>}
                />

                <Route 
                    path="/planning" 
                    element={getRole() === "administrateur" ? <Planning /> : <Navigate to="/"/>}
                />

                <Route 
                    path="/planification" 
                    element={getRole() === "administrateur" ? <Planification /> : <Navigate to="/"/>}
                />
                
                {/* <Route
                    path="/planning"            
                    element={getPizzas() ? <Planning /> : <Navigate to="/Pizzas" />}
                /> */}

                <Route 
                    path="/list" 
                    element={getRole() === "administrateur" ? <PersonList /> : <Navigate to="/"/>}
                />

                {/* IF NOT ADMINISTRATEUR HE NOT ACCESS TO THIS ROUTE */}


                {/* IF NOT AUTHENTICED HE NOT ACCESS TO THIS ROUTE */}



                {/* IF NOT AUTHENTICED HE NOT ACCESS TO THIS ROUTE */}

                <Route path="/inscription" element={<SignUp />} />
                <Route
                    path="/profile"
                    element={getToken() ? <Profile /> : <Navigate to="/connexion" />}
                />
                <Route path='/connexion' element={<Login />} />
                <Route path='/carte' element={<Carte />} />
                <Route path='/connexion' element={<Login />} />
                <Route path='/' element={<Accueil />} />
                <Route path='/auth/reset-password' element={<ForgotPassword />} />
                <Route path='/validation' element={<Validation />} />
                <Route path='/panier' element={<Panier />} />
            </Routes>

        </div>

    );
}

export default App;
