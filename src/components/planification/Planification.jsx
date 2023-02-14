import {useEffect} from 'react';
import axios from 'axios';
import { API } from "../constant";
import './planification.css';
import { useState } from 'react';
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { TbSquarePlus, TbSquareMinus } from 'react-icons/tb'



const Planification = () => {
    const navigate = useNavigate();
    let retrievedObject = localStorage.getItem('pizzas');
	const [pizzas, setPizzas] = useState(JSON.parse(retrievedObject));
	const [prep_time, setPrep_time] = useState("");
	const [pizzas_name, setPizzasname] = useState([]);
	const [pizzas_note, setPizzasnote] = useState([]);
	const [number_pizzas, setNumber_pizzas] = useState(0);
	const [prix_total, set_prix_total] = useState(0)
    const [TotalPrice, SetTotalPrice] = useState(0)
    const [time_one_pizza, setTime_one_pizza] = useState(0);
    const [pizzasTaille, setPizzasTaille] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date().toISOString());
    const [MinConvertedDate, SetMinConvertedDate] = useState()
    const [modalisOpen, setmodalisOpen] = useState(false);
	const [modalisOpenFalse, setmodalisOpenFalse] = useState(false);
	const [debut, setDebut] = useState("");
	const [fin, setFin] = useState("");
	const [lst_pizza_object, setLst_pizza_object] = useState({});
	const [crenaux_disponible, setCrenaux_disponible] = useState(0);
    const [Hour, SetHour] = useState(["18h", "19h", "20h", "21h", "22h"])
    const [DateAndHour, setDateAndHour] = useState()


    function get_date_formated_today(){
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0');
		let yyyy = today.getFullYear();
		today = yyyy + '-' + mm + '-' + dd;
		return today;
	}

    const [date, setDate] = useState(get_date_formated_today());
    const [data, setData] = useState()
    useEffect(()=>{
        const loadReserved = async (date) => {
            const response = await axios.get(`${API}/reservations?filters[debut_resa][$containsi]=${date}`);
            console.log(response)
			setData(response.data.data);
        }
        loadReserved(date);
    }
    ,[date]);

    useEffect(() => {
        setInterval(() => {
          setCurrentDate(new Date().toISOString());
          ParseDate()
        }, 60000);
      }, []);

    useEffect(()=>{
		setTime_one_pizza(100);
		let count_pizzas = 0;
		let lstpizza = [];
		let lstpizza_note = [];
		let lstpizza_taille = [];
		let prix_total = 0;
	if(pizzas){

		pizzas.forEach(pizza => {

			for (let i = 0; i < pizza.quantity; i++) {
				count_pizzas += 1;
				lstpizza.push(pizza.name);
				lstpizza_note.push(pizza.note[i])
				lstpizza_taille.push(pizza.taille)
				prix_total += pizza.prix
			}
		})
		setNumber_pizzas(count_pizzas);
		if (pizzas_name.length == []) {
			setPizzasname(lstpizza);
			setPizzasnote(lstpizza_note);
			set_prix_total(prix_total)
			setPizzasTaille(lstpizza_taille)
		}
    
		let response = secondsToms(number_pizzas * time_one_pizza);
		setPrep_time(response);
        getTotalPrice()
	}
    else{
        navigate("/pizzas") 
    }
	},)

    const [client, setclient] = useState('');
	const handleChangeGetClientName = event => {
		setclient(event.target.value);	
	  };

	const [info_Supp, setInfo_supp] = useState('');
	const handleChangeInfoSupp = event => {
		setInfo_supp(event.target.value);
	};

    function ParseDate(){
        const date = new Date(currentDate).toLocaleString();
        const originalDate = date.substring(0, 19).replace(/T/, ' ').replace(" ", "T").slice(0, -3)
        const convertedDate = originalDate.slice(6, 10) + "-" + originalDate.slice(3, 5) + "-" + originalDate.slice(0, 2) + originalDate.slice(10);
        SetMinConvertedDate(convertedDate)
    }

    function secondsToms(d) {
		d = Number(d);
		var h = Math.floor(d / 3600);
		var m = Math.floor(d % 3600 / 60);
		var s = Math.floor(d % 3600 % 60);
		var hDisplay = h > 0 ? h + (h == 1 ? " heure, " : " heures, ") : "";
		var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes") : "";
		var sDisplay = s > 0 ? s + (s == 1 ? " seconde" : " secondes") : "";
		return hDisplay + mDisplay + sDisplay; 
	}

    function getTotalPrice(){
        let tmp_price = 0
        pizzas.map((item, index) =>{
            tmp_price += item.prix * item.quantity
        })
        SetTotalPrice(tmp_price)
    }
    const onClickHandler = () =>{
        navigate("/planning")
    }

    console.log(pizzas)

    return (
        <>
            <h1>Planification</h1>
                <div className='container'>
                    <div className='container-resume'>
                        <h2>Résumer de la commande</h2>
                        <div>
                            {pizzas.map((item, index) => (
                                <div>{item.quantity+" "+item.taille+" "+item.name +" "+ item.prix +"€"}</div> 
                            ))}
                        </div>
                        <span>Temps de préparation pour : <b>{prep_time}</b></span>
                        <span>Nombre de pizza commander : <b>{number_pizzas}</b></span>
                        Total : <b>{TotalPrice} € </b>
                    </div>
                    <div className='container-form-validation'>
                        <button style={{padding : "1%"}} onClick={() => onClickHandler()}>Valider</button>
                    </div>
                </div>
        </>
    )

}

export default Planification;