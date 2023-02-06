import {useEffect} from 'react';
import './panier.css';
import { useState } from 'react';
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { TbSquarePlus, TbSquareMinus } from 'react-icons/tb'



const Panier = () => {
    const navigate = useNavigate();


    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
      });
    
        const [isToggled, setIsToggled] = useState(false);
      console.log(cart)

      const [TotalPrice, SetTotalPrice] = useState(0)

      function getTotalprice(){
        let tmp_price = 0
        cart.map((item, index) => (
            tmp_price += item.attributes.prix * item.quantity
        ))
        return tmp_price
      }

      useEffect(() => {    
        localStorage.setItem("cart", JSON.stringify(cart));
        SetTotalPrice(getTotalprice())
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


    return (
        <>
            <div className='bg-pizza'>
                <h1>À Quoi Pizza</h1>
                <p>Face cave coopérative, Av. des Pins, 13680 Lançon-Provence</p><br />
                <p>Tel: 06 14 62 72 48</p>
            </div>
            <div className='parent-container-panier'>
                <div className='container-panier'>
                    {cart.map((item, index) => (
                        <div className='row' key={index}>
                            {console.log(item)}
                            {/* {item.attributes.nom + " " +item.quantity} */}
                            <div className='titre'>{item.attributes.taille+" "+item.attributes.nom + " : " + item.quantity}</div>
                            <div className='body'>
                                <TbSquarePlus onClick={() => addToCart(item)} className='icon-panier' />
                                <TbSquareMinus onClick={() => deleteFromCart(item)} className='icon-panier' />
                            </div>
                            <div className='footer'>
                                {item.attributes.prix * item.quantity} €
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                Total : {TotalPrice}
            </div>
            <div className='container-bouton'>
              <button className='btn-commande' onClick={() => setIsToggled(!isToggled)}>
                {isToggled ? "06.14.62.72.48" : "COMMANDER"}
              </button>
            </div>
        </>
    )
}

export default Panier;