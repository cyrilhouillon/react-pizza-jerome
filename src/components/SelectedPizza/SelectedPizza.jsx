import React from "react";
import { setPizzas } from "../helpers";
import { getPizzas } from "../helpers";
import { removePizzas } from "../helpers";
import getAllPizzasPopulate from "../../api/PizzasApi";
import { useState, useEffect, useRef} from 'react'; 
import "./SelectedPizza.css"

const SelectedPizza = () => {
    
  const [pizzas, setPizza] = useState([]);
  const [text, setText] = useState("");
  const [display_pizzas, setDisplay] = useState([]);
  const [display_pizzas_selected, setDisplay_pizzas_selected] = useState([]);
  const [success_message, set_success_message] = useState("");
  const [popup, setPopup] = useState(false);
  const [note, setNote] = useState("");
  const input1 = useRef(null);
  const [IdSelected, setIdSelected] = useState(null);
  const [NameSelected, setNameSelected] = useState(null);
  const [SizeSelected, setSizeSelected] = useState(null);
  const [PriceSelected, setPriceSelected] = useState(null);
  const [IngredientsSelected, setIngredientsSelected] = useState(null);

  // TESTE THIS FUNCTION OF GET PIZZA AND STRUCTURED PIZZA FOR AUTOCOMPLETE ETC
  useEffect(()=>{
    const re = getAllPizzasPopulate();
      re.then(function(data) {
        console.log(data)
        if (data != null) {
          console.log(data)
          structured_pizzas(data);
        }
     })
  }, [])

  useEffect(() => {
    if (getPizzas() != null) {
      setDisplay_pizzas_selected(JSON.parse(getPizzas()));
    }
  }, [])


  function structured_pizzas(data){
    console.log("no need +1")
    let pizzas = [];
    // copy the data without same pizza 
    data.map(pizza => {
      let ingredients = [];
      pizza.attributes.ingredients.data.map(ingredient => {
        ingredients.push(ingredient.attributes.nom_ingredient);
      })
      let pizza_structured = {
        "id": [pizza.id],
        "name": pizza.attributes.nom,
        "price": [pizza.attributes.prix],
        "size": [pizza.attributes.taille],
        "ingredients": ingredients
      }
      if (pizzas.filter(pizza => pizza.name == pizza_structured.name).length == 0) {
        pizzas.push(pizza_structured);
      }
    })
    let res = merge_pizza(pizzas, data);
    setPizza(res);
    setDisplay(res);
    return "ok"
  }

  function merge_pizza(pizzas, data){
    pizzas.map(pizza => {
      data.map(pizza2 => {
        if (pizza.name == pizza2.attributes.nom && pizza.id != pizza2.id) {
          pizza.id.push(pizza2.id);
          pizza.price.push(pizza2.attributes.prix);
          pizza.size.push(pizza2.attributes.taille);
        }
      })
    })
    return pizzas
  }
  
  const onChangeHandler = (text) => {
    // initialisation du tableau des matchs
    let matches = [];
    // si il y a au moins un caractère dans le champ de recherche
    if (text.length > 0) {
      matches = pizzas.filter(pizza => {
        const regex = new RegExp(`^${text}`, "i");
        // espace all accent and special character and uppercase

        pizza.name = pizza.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return pizza.name.match(regex)
      })
      // set le display qui change en fonction de la recherche
      setDisplay(matches);
    }
    // else rien dans search bar
    else{
      // set le display a toutes les pizzas
      setDisplay(pizzas);
    }
    // set le text de la search bar
    setText(text)
  }

// ---------- COMPOSANT CLICK ON PIZZA (change style, create list of selected pizza) ------------ //
const handleClick = (id) => {
    setIdSelected(id);
    setPopup(true);
    pizzas.map(pizza => {
      pizza.id.map((id_pizza) => {
        if (id_pizza == id) {
          setNameSelected(pizza.name);
          setIngredientsSelected(pizza.ingredients);
          setSizeSelected(pizza.size[pizza.id.indexOf(id)]);
          setPriceSelected(pizza.price[pizza.id.indexOf(id)]);
        }
      })
    }) 
}
  const handleClickConfirm = (id) => {
    const lstid = display_pizzas_selected.map(pizza => pizza.id);
    if (!lstid.includes(id)) {
      pizzas.map(pizza => {
        pizza.id.map((id_pizza) => {
          // si l'id de la pizza est dans la liste des id des pizzas selectionnées
          if (id_pizza == id) {
            display_pizzas_selected.push({
              "id" : id,
              "name" : pizza.name,
              "taille" : pizza.size[pizza.id.indexOf(id)],
              "prix" : pizza.price[pizza.id.indexOf(id)],
              "quantity" : 1,
              "note" : [note],
            }); 
          }
        })
      }) 
      } else {
        const index = display_pizzas_selected.findIndex((item) => item.id === id);
            display_pizzas_selected[index].quantity += 1;	
            display_pizzas_selected[index].note.push(note);
        }
        refresh_lst_selected(display_pizzas_selected);
        console.log(display_pizzas_selected);
        setPopup(false)
        setNote("");
        onChangeHandler("");
        input1.current.focus();
  }

const refresh_lst_selected = (display_pizzas_right) => {
    // match et return les pizzas selectionnées
    let matches = [];
    matches = display_pizzas_right.map(pizza => {
      const regex = new RegExp(`${pizza.name}`, "gi");
      return pizza
    }
    )
    // set le display qui change en fonction de la recherche
    setDisplay_pizzas_selected(matches);
    setPizzas(matches)
}

// create a function ClickLessQuantity to decrease quantity of pizza selected
const ClickLessQuantity = (id) => {
  // find the index of the pizza selected
  const index = display_pizzas_selected.findIndex((item) => item.id === id);
  // if the quantity is > 1, decrease the quantity
  if (display_pizzas_selected[index].quantity > 1) {
    display_pizzas_selected[index].quantity -= 1;
    display_pizzas_selected[index].note.pop();
  }
  // else remove the pizza from the list
  else {
    display_pizzas_selected.splice(index, 1);
  }
  refresh_lst_selected(display_pizzas_selected)
  if (display_pizzas_selected.length == 0) {
    removePizzas();
  }
}

const ClickSuppr = (id) => {
  // find the index of the pizza sel
  const index = display_pizzas_selected.findIndex((item) => item.id === id);
  display_pizzas_selected.splice(index, 1);
  refresh_lst_selected(display_pizzas_selected)
  if (display_pizzas_selected.length == 0) {
    removePizzas();
  }
}

const ClickPlusQuantity = (id) => {
  display_pizzas_selected.map((pizza) => {
    if (pizza.id === id) {
      pizza.quantity += 1;
    }
  })
  refresh_lst_selected(display_pizzas_selected)
}

const ClickSaveSelectedPizza = () => {
  if (display_pizzas_selected.length > 0) {
    setPizzas(display_pizzas_selected);
    set_success_message("Vos pizzas ont bien été sauvegardées");
    setTimeout(() => {
      window.location.href = "/planification"; 
    }, 1000);
  }
  else {
    removePizzas();
    //  remove item pizzas into local storage
    set_success_message("Vous n'avez pas sélectionné de pizza");
    setTimeout(() => {
    }, 2000);
  }  
}
  return (
    <div className="all_container">
      {popup && (
      <div className="popup">
        <div className="popup_container">
          <div className="popup_content">
            <div className="popup-header">
              <h2>Vous avez selectionnées la pizza</h2>
              <h1>{NameSelected}</h1>
              <h3>de taille {SizeSelected} à {PriceSelected} €</h3>
              <h3>Elle contient les ingrédients suivants :</h3>
              {IngredientsSelected.map((ingredient) => (
                <h4>{ingredient}</h4>
              ))}
            </div>
            <div className="popup-inner-content">
              <div className="popup_input">
                <label 
									style={{  borderRadius: "5px", outline: "none", fontSize: "16px", color: "#333", fontWeight: "300", letterSpacing: "1px",  textAlign: "center", padding: "10px 20px", display: "inline-block", margin: "10px 10px 10px 0" }}
									htmlFor="">Informations supplementaires optionnel
                </label>
                <input 
									style={{marginBottom: "10px", padding: "20px", width: "100%", borderRadius: "5px", border: "1px solid #ccc", outline: "none", fontSize: "10px", color: "black", fontWeight: "900", letterSpacing: "1px", textTransform: "uppercase", textAlign: "center", transition: "all 0.3s ease-in-out", boxShadow: "0 0 10px rgba(0,0,0,0.1)", backgroundColor: "#fff"}}
                  type="text"
                  placeholder="note relative à la pizza"
                  value={note}
                  onChange={(e) => setNote (e.target.value)} 
                />
              </div>
              <div className="popup_button">
                <button
                  className="btn btn-primary"
                  onClick={() => handleClickConfirm(IdSelected)}
                >
                  Confirmer
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setPopup(false)}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
      <div className="search-and-display">
            <h2 className='label-search-bar' htmlFor="search-bar">Barre de recherche</h2>
            <div className="div-search-bar">
                <div className="div-input-search-bar">
                  <input 
                    className='input-search-bar'
                    type="text"
                    name="search-bar"
                    id="id-search-bar"
                    autoComplete="on"
                    autoFocus="autofocus"
                    ref={input1}
                    onChange={e => onChangeHandler(e.target.value)}
                    value={text}
                  />
                </div>
            </div>      
          <div className="div-display-pizzas-ingredient">
            {display_pizzas.map(display_pizzas => (
              <React.Fragment >
                <div className="div-card-pizzas-ingredient">
                  <div className="div-display-pizzas">
                    <label>{display_pizzas.name}</label>
                  </div>
                  <div className="div-display-ingredient">
                    <span>Ingredients :  
                      {display_pizzas.ingredients.map(ingredient => (
                        <React.Fragment>
                          <span >
                          {" " + ingredient}
                          </span>
                        </React.Fragment>
                        ))}
                    </span>
                  </div>
                  <div className="div-display-btn">

                  {display_pizzas.id.map((index, idx) => (
                    <React.Fragment>
                        <div className="btn_id" onClick={() => handleClick(index)} >
                          <span>Taille : {display_pizzas.size[idx]} </span>
                          <span>Prix : {display_pizzas.price[idx]} €</span>
                        </div>
                    </React.Fragment>
                    ))}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        {/* AUTOCOMPLETE */}
        <div className="form_pizza">
            <div className="pizza-selected">
                <div className="pizza-selected-title">
                    <h2>Pizza sélectionnée</h2>
                </div>
                <div className="display-selected-pizza">
                  {display_pizzas_selected.map(display_pizzas_selected => (

                    <React.Fragment>
					          <div className="pizza-quantity-btn">
                      <div className="div-card-pizzas-ingredient">
                        <div className="div-display-pizzas">
                          <span> {display_pizzas_selected.name}  x{display_pizzas_selected.quantity}</span>
                          <span> {display_pizzas_selected.taille == "Grande" ? " : XL" : " : M "}</span>
                        </div>
                      </div>
                      <div className="notes">
                        {display_pizzas_selected.note.map(note => (
                          <React.Fragment>
                            <div className="note">
                              <span>{note == "" ? "aucune note" : note}</span>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>

                        <div className="div-input-less">
                          {/* <span onClick={() => ClickPlusQuantity(display_pizzas_selected.id) } className="span-button">+</span>
                          <span onClick={() => ClickLessQuantity(display_pizzas_selected.id) } className="span-button">-</span> */}
                          <span onClick={() => ClickSuppr(display_pizzas_selected.id) } className="span-button">X</span>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
				
                <div className="save-pizza-selected">
                  <button onClick={() => ClickSaveSelectedPizza() } className="btn-save-pizza-selected">Planifier</button>
                </div>
				      <span>{success_message}</span>
            </div>
        </div>    
    </div>
  );
}

export default SelectedPizza;