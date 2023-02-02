import React from 'react'
import './accueil.css';
import axios from '../../api/axios';
import { API } from "../constant";
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Accueil = () => {

    const navigate = useNavigate();


    axios.get(`${API}/pizzas/`,{
      params:{
        id:1
      }
    })
    .then(function (res) { 
     })


     const navigateProduct = () => {
       navigate('/pizzas');
     }
    // console.log(data);

  return (

    <>
      <div className='bg-pizza'>
        <h1>À Quoi Pizza</h1>
        <p>Face cave coopérative, Av. des Pins, 13680 Lançon-Provence</p><br />
        <p>Tel: 06 14 62 72 48</p>
      </div>

      <div className='main-content'>
        <div className='group-content'>
          <div className='single-content'>
            <button onClick={navigateProduct} >Nos produits</button>
            <p>content</p>
          </div>
          <div className='single-content'>
            <button>Livraison</button>
            <p>content</p>
          </div>        
          <div className='single-content'>
            <button>3</button>
            <p>content</p>
          </div>
        </div>
      </div>

        <div className='c'>
          <ul>
            <li>Lundi : fermé</li>
            <li>Mardi : 18:00-21:30</li>
            <li>Mercredi : 18:00-21:30</li>
            <li>Jeudi : 18:00-21:30</li>
            <li>Vendredi : 18:00-22:00</li>
            <li>Samedi : 18:00-22:00</li>
            <li>Dimanche : 18:00-22:00</li>
          </ul>

        </div>

    </>

  )
}

export default Accueil;