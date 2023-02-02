
import { Button, Space } from "antd";
import React from "react";
import { CgWebsite } from "react-icons/cg";
import { AiOutlineShoppingCart, AiOutlineCloseCircle } from 'react-icons/ai'
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { removeRole, removeToken } from "./helpers";
import { setPizzas } from "./helpers";
import { getPizzas } from "./helpers";
import { getRole } from "./helpers";
import {useRef, useEffect, useState} from 'react';
import {FaBars, FaTimes} from "react-icons/fa";
import "../style/nav.css";

const NavBar = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [count_items, setCount_items] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [display_pizza_in_cart, setDisplay_pizza_in_cart] = useState([]);
    const [showSlideBar, setShowSlideBar] = useState(false);

    useEffect (() => {
        const loadCart = () => {
            if (getPizzas() != null) {
                let parsedObject = JSON.parse(getPizzas());
                setCount_items("Panier : " + parsedObject.length + " v");
                setDisplay_pizza_in_cart(parsedObject);
            }
            else{
                setCount_items("Panier : 0");
            }
            
        }
        loadCart();
    }, [])



    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

    const handleLogout = () => {
        removeToken();
        removeRole();
        window.location.reload();
        navigate("./", { replace: true });
    };

    const DisplaySlideCart = () => {
        console.log("ay")
    }

    // const navigatePanier = () => {
    //     navigate('')
    // }
        // // display pizzas in local storage if there is any
        // if (localStorage.getItem('pizzas') != null) {
        //     let retrievedObject = localStorage.getItem('pizzas');
        //     let parsedObject = JSON.parse(retrievedObject);
        //     console.log(parsedObject.length);
        // }

    return (
        <header>
            <h3>Pizza-jérome</h3>
            <nav ref={navRef}>
                <a href='./'>Accueil</a>
                <a href='/carte'>La carte</a>
                {getRole() === "administrateur" && (
                    <> 
                        <a href='/pizzas'>Pizzas</a>    
                        <a href='/planning'>Planning</a>    
                        <a href='/reservation'>Réservation</a>    
                    </>
                )}
                
                

                {user ? (
                    <> 
                        <a href="/profile">{user.username}</a>
                        <a
                            style={{ cursor: "pointer" }}
                            className="auth_button_signUp"
                            type="primary"
                            onClick={handleLogout}
                        >
                            Logout
                        </a>
                    </>
                ) :( 
                <>
                    <a href='/connexion'>Connexion</a>
                    <a href='/inscription'>Inscription</a>
                </>

                )
                }
                

                {/* PANIER ET BOUTON SUR LA CARTE */}
                
                {/* <div> */}
                    {/* {display_pizza_in_cart.map((pizza, index) => ( */}
                        {/* <div key={index}> */}
                            {/* <p style={{color: "black"}}>{pizza.name}</p> */}
                        {/* </div> */}
                    {/* ))} */}
                {/* </div> */}
                
                {getRole() === 'Authenticated' && (
                    <>
                    {/* onClick={() => DisplaySlideCart()} */}
                        <div className="cart" id="dropdown_cart" onClick={() => setShowSlideBar(!showSlideBar)} ><AiOutlineShoppingCart className='nav-icon'/></div>
                        {/* <span>{ count_items }</span> */}
                        {showSlideBar && (
                            <div className="slidebar"
                            style={{
                                height: "100%",
                                width: "40%",
                                backgroundColor: "lightgray",
                                position: "absolute",
                                top: 0,
                                right: 0,
                                bottom: 0,
                                zIndex: 1,
                                transition: "transform 0.9s ease-out",
                            }}
                            >
                                <div
                                  className="icon-close"
                                  style={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0
                                  }}
                                >
                                  <AiOutlineCloseCircle className="icon" onClick={() => setShowSlideBar(false)}/>
                                </div>
                            </div>
                        )}
                    </>
                )}
                <button className='nav-btn nav-close-btn' onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <button className='nav-btn' onClick={showNavbar}>
                <FaBars />
            </button>
         </header>
    );
};

export default NavBar;