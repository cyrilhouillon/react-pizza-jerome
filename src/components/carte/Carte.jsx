import {useEffect} from 'react';

import './carte.css';
import { TbSquarePlus, TbSquareMinus } from 'react-icons/tb'
import '../accueil/accueil.css';
import getAllPizzasPopulate from "../../api/PizzasApi";
import { useState } from 'react';
import { useAuthContext } from "../../context/AuthContext";

const Carte = () => {

    const { user } = useAuthContext();
    const [data, setData] = useState([])
    const [url] = useState("https:/aquoipizza.com/uploads/pizza_9e892b8f7e.jpg")
    const [toggle, setToggle] = useState(false);
    const [Taille, SetTaille] = useState("Grande")

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

    const ClickSavePizzaToCart = (item) => {
        console.log("a rajouter", item)
    }

    const ClickSupprPizzaToCart = (item) => {
        console.log("a enlever", item)
    }

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
                <div className='btn-taille'>
                    Taille selectionnée
                    <button onClick={handleToggle}>
                        {toggle ? "Moyenne" : "Grande"}
                    </button>
                </div>
                <div className="scrollable-container">
                    {data.map((item, index) => (
                        (item.attributes.taille == Taille ? (
                            <>
                                <div className="card" key={index}>
                                    {/* {console.log(item.attributes.image.data[0].attributes.url)} */}
                                    {/* {console.log(item.attributes)} */}
                                    <div>
                                        <img src={url} />
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
                                            {user ?(
                                                <>
                                                <div className='div_footer_button'>
                                                    <div onClick={() => ClickSavePizzaToCart(item) } className='button'><TbSquarePlus className='icon' /></div>
                                                    <div onClick={() => ClickSupprPizzaToCart(item) } className='button'><TbSquareMinus className='icon' /></div>
                                                </div>
                                                </>
                                            ) : (<></>)}
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