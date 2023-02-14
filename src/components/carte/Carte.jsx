import {useEffect} from 'react';

import './carte.css';
import { TbSquarePlus, TbSquareMinus } from 'react-icons/tb'
import { AiOutlineShoppingCart, AiOutlineCloseCircle } from 'react-icons/ai'
import '../accueil/accueil.css';
import getAllPizzasPopulate from "../../api/PizzasApi";
import { useState } from 'react';
import { useAuthContext } from "../../context/AuthContext";
import { getRole } from "../helpers";
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";



const Carte = () => {

    const { user } = useAuthContext();
    const [data, setData] = useState([])
    const [url] = useState("https:/aquoipizza.com/uploads/pizza_9e892b8f7e.jpg")
    const [toggle, setToggle] = useState(false);
    const [Taille, SetTaille] = useState("Grande")
    const [showSlideBar, setShowSlideBar] = useState(false);

    const navigate = useNavigate();

    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
      });

  useEffect(() => {    
    localStorage.setItem("cart", JSON.stringify(cart));
    totalQuantity()
  }, [cart]);

  const addToCart = (item) => {
    const index = cart.findIndex((cartItem) => cartItem.id === item.id);
    if (index === -1) {
      setCart([...cart, { ...item, quantity: 1 }]);
    } else {
      const newCart = [...cart];
      newCart[index].quantity += 1;
      setCart(newCart);
    }
  };

  const deleteFromCart = (itemToDelete) => {
    const index = cart.findIndex((cartItem) => cartItem.id === itemToDelete.id);
    if (index === -1) {
      return;
    }

    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      setCart(newCart);
    } else {
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const [AllQuantity, setAllQuantity] = useState(0)
  const totalQuantity = () => {
    setAllQuantity(cart.reduce((total, item) => total + item.quantity, 0));
  };

    const handleToggle = () => {
      setToggle(!toggle);
      if(toggle === false){
        SetTaille("Moyenne")
      } else{ SetTaille("Grande")}
    };


    useEffect(()=>{
        const re = getAllPizzasPopulate();
        re.then(function(data) {
            if (data != null) {
            // console.log(data)
            setData(data)
            }
        })
    }, [])

    function redirectToCart(){
        navigate("/panier")
    }

    console.log(AllQuantity, cart)

return (

    <>
        <div className='bg-pizza'>
            <h1>À Quoi Pizza</h1>
            <p>Face cave coopérative, Av. des Pins, 13680 Lançon-Provence</p><br />
            <p>Tel: 06 14 62 72 48</p>
        </div>
        <div className='container-bg-carte'>
            <div className='carte-center'>
                <h2>La carte</h2>
                <div className='btn-header'>
                    <div className='btn-taille'>
                        Taille selectionnée
                        <button onClick={handleToggle}>
                            {toggle ? "Moyenne" : "Grande"}
                        </button>
                    </div>
                    <div className="cart" id="dropdown_cart" onClick={() => redirectToCart()} >
                        <AiOutlineShoppingCart className='nav-icon'/>
                        <span>{AllQuantity}</span>
                    </div>                            
                </div>
                <div className="scrollable-container">
                    {data.map((item, index) => (
                        (item.attributes.taille == Taille ? (
                            <>
                                <div className="card" key={index}>
                                    {/* {console.log(item.attributes.image.data[0].attributes.url)} */}
                                    {/* {console.log(item.attributes)} */}
                                    <div>
                                        <img alt="photo de la pizza selectionner" src={url} />
                                        {console.log(url)}
                                    </div>
                                    <div className='card_container'>
                                        <div className='div_header'>
                                            <h2>{item.attributes.nom}</h2>
                                        </div>
                                        <div className='div_body'>
                                            <p>{item.attributes.description}</p>
                                            Ingredients : 
                                            {item.attributes.ingredients.data.map((ingr) =>
                                                <span> {ingr.attributes.nom_ingredient}  </span>    
                                            )}
                                        </div>
                                        <div className='div_footer'>
                                            <div className='div_footer_button'>
                                                <div onClick={() => addToCart(item)} className='button'><TbSquarePlus className='icon' /></div>
                                                <div onClick={() => deleteFromCart(item)} className='button'><TbSquareMinus className='icon' /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (<></>))))}
                </div>
            </div>
        </div>
    </>
  )
}

export default Carte;