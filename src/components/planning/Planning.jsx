import React from "react";
import axios from 'axios';
import { API } from "../constant";
import { useState, useEffect} from 'react';
import "./Planning.css"
import { useNavigate } from "react-router-dom";

const  Planning = () => {
	
	const navigate = useNavigate();	
	let retrievedObject = localStorage.getItem('pizzas');
	const [pizzas, setPizzas] = useState(JSON.parse(retrievedObject));
	const [pizzas_name, setPizzasname] = useState([]);
	const [pizzas_note, setPizzasnote] = useState([]);
	const [number_pizzas, setNumber_pizzas] = useState(0);
    const [reserved, setReserved] = useState([]);
    const [date, setDate] = useState(get_date_formated_today());
	const [prep_time, setPrep_time] = useState("");
	const [modalisOpen, setmodalisOpen] = useState(false);
	const [modalisOpenFalse, setmodalisOpenFalse] = useState(false);
	const [debut, setDebut] = useState("");
	const [fin, setFin] = useState("");
	const [lst_pizza_object, setLst_pizza_object] = useState({});
	const [pizza_reserved, setPizzaReserved] = useState({})
	const navigateValidate = () => {
		navigate('/reservation');
	}
	console.log(pizzas)

	// reformat date to dd/mm/yyyy
	function get_date_formated_today(){
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();
		today = yyyy + '-' + mm + '-' + dd;
		return today;
	}

	// const [nbrpizza, setNbrPizza] = useState(0)
	// function get_nbr_Pizza(){
	// 	const date_of_day = new Date();
    // 	const dayOfWeek = date_of_day.getDay();
	// 	console.log(dayOfWeek)
	// 	// vendredi == 5 | samedi == 6 | dimanche == 7
	// 	if (dayOfWeek == 5 || dayOfWeek == 6 || dayOfWeek == 0){
	// 		setNbrPizza(7)
	// 	}
	// 	else{
	// 		setNbrPizza(6)
	// 	}
	// 	console.log(nbrpizza)
	// }

    
	const [crenaux, setCrenaux] = useState([
		{"horaire" : "18h00 - 18h10", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 }, 
		{"horaire" : "18h10 - 18h20", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "18h20 - 18h30", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "18h30 - 18h40", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 }, 
		{"horaire" : "18h40 - 18h50", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 }, 
		{"horaire" : "19h00 - 19h10", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 }, 
		{"horaire" : "19h10 - 19h20", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "19h20 - 19h30", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "19h30 - 19h40", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "19h40 - 19h50", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "19h50 - 20h00", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "20h00 - 20h10", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "20h10 - 20h20", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "20h20 - 20h30", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "20h30 - 20h40", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "20h40 - 20h50", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "20h50 - 21h00", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "21h00 - 21h10", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "21h10 - 21h20", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "21h20 - 21h30", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "21h30 - 21h40", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "21h40 - 21h50", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "21h50 - 22h00", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 }
	]);

	const [crenaux1, setCrenaux1] = useState([
		{"horaire" : "18h00 - 18h10", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 }, 
		{"horaire" : "18h10 - 18h20", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "18h20 - 18h30", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "18h30 - 18h40", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 }, 
		{"horaire" : "18h40 - 18h50", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 }, 
		{"horaire" : "19h00 - 19h10", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 }, 
		{"horaire" : "19h10 - 19h20", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "19h20 - 19h30", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "19h30 - 19h40", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "19h40 - 19h50", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "19h50 - 20h00", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "20h00 - 20h10", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "20h10 - 20h20", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "20h20 - 20h30", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "20h30 - 20h40", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "20h40 - 20h50", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "20h50 - 21h00", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "21h00 - 21h10", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "21h10 - 21h20", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "21h20 - 21h30", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "21h30 - 21h40", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "21h40 - 21h50", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
		{"horaire" : "21h50 - 22h00", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 }
	]);
     
	const [data, setData] = useState([]);
	const [prix_total, set_prix_total] = useState(0)
	useEffect(()=>{
        const loadReserved = async (date) => {
            const response = await axios.get(`${API}/reservations?filters[debut_resa][$containsi]=${date}`);
			strcutured_pizza_reserved(response.data.data)
			setData(response.data.data);
        }
        loadReserved(date);
		// console.log(date)
		// console.log(crenaux)
    }
    ,[date]);
	
	const setDateQuery = (e) => {
		console.log(e)
		setDate(e);

	}
    const [time_one_pizza, setTime_one_pizza] = useState(0);
    const [pizzasTaille, setPizzasTaille] = useState([]);
    useEffect(()=>{
		setTime_one_pizza(100);
		let count_pizzas = 0;
		let lstpizza = [];
		let lstpizza_note = [];
		let lstpizza_taille = [];
		let prix_total = 0;
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
	},) 


	const [count, setCount] = useState(0)
	function strcutured_pizza_reserved(data){
		setCrenaux1([
			{"horaire" : "18h00 - 18h10", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 }, 
			{"horaire" : "18h10 - 18h20", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
			{"horaire" : "18h20 - 18h30", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
			{"horaire" : "18h30 - 18h40", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 }, 
			{"horaire" : "18h40 - 18h50", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 }, 
			{"horaire" : "19h00 - 19h10", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 }, 
			{"horaire" : "19h10 - 19h20", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
			{"horaire" : "19h20 - 19h30", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
			{"horaire" : "19h30 - 19h40", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
			{"horaire" : "19h40 - 19h50", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
			{"horaire" : "19h50 - 20h00", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
			{"horaire" : "20h00 - 20h10", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
			{"horaire" : "20h10 - 20h20", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
			{"horaire" : "20h20 - 20h30", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
			{"horaire" : "20h30 - 20h40", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
			{"horaire" : "20h40 - 20h50", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
			{"horaire" : "20h50 - 21h00", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
			{"horaire" : "21h00 - 21h10", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
			{"horaire" : "21h10 - 21h20", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
			{"horaire" : "21h20 - 21h30", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
			{"horaire" : "21h30 - 21h40", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
			{"horaire" : "21h40 - 21h50", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
			{"horaire" : "21h50 - 22h00", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 }
		])
		
		if (data.length == 0) {
			setCrenaux([
				{"horaire" : "18h00 - 18h10", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 }, 
				{"horaire" : "18h10 - 18h20", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
				{"horaire" : "18h20 - 18h30", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
				{"horaire" : "18h30 - 18h40", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 }, 
				{"horaire" : "18h40 - 18h50", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 }, 
				{"horaire" : "19h00 - 19h10", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 }, 
				{"horaire" : "19h10 - 19h20", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
				{"horaire" : "19h20 - 19h30", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
				{"horaire" : "19h30 - 19h40", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
				{"horaire" : "19h40 - 19h50", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
				{"horaire" : "19h50 - 20h00", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
				{"horaire" : "20h00 - 20h10", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
				{"horaire" : "20h10 - 20h20", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
				{"horaire" : "20h20 - 20h30", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
				{"horaire" : "20h30 - 20h40", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
				{"horaire" : "20h40 - 20h50", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
				{"horaire" : "20h50 - 21h00", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
				{"horaire" : "21h00 - 21h10", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
				{"horaire" : "21h10 - 21h20", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
				{"horaire" : "21h20 - 21h30", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
				{"horaire" : "21h30 - 21h40", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
				{"horaire" : "21h40 - 21h50", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 },
				{"horaire" : "21h50 - 22h00", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"], "count_indisponible" : 6 }
			])
		}
		else{
		data.map(resa => {
			crenaux.map((creneau,  idx_creneau) => {
                creneau.count_indisponible = 6
				let transform_debut = resa.attributes.debut_resa.split("T")[1].split(":")[0]+":"+resa.attributes.debut_resa.split("T")[1].split(":")[1]+":"+resa.attributes.debut_resa.split("T")[1].split(":")[2].split(".")[0];
                 
				// console.log(transform_debut, creneau.horaire.split(" - ")[0] + ":00", idx_creneau);

				for(let i = 0; i < 6; i++){
					let res = calcul_debut(creneau.horaire, i)
					// console.log(res, transform_debut)
                    
					if (transform_debut == res) {

						creneau.disponibilité.map((dispo, index_dispo) => {

							if (index_dispo === i){
								Object.keys(resa.attributes.pizzas_reserved).map(idx => {
									if (index_dispo > 5){
										index_dispo = 0;
										idx_creneau += 1;	
									}
									crenaux1[idx_creneau].disponibilité[index_dispo] = resa.attributes.pizzas_reserved[idx].pizza;
									index_dispo += 1;
									crenaux1[idx_creneau].count_indisponible -= 1 
								})	
							}
						})
					}				
				}
			})	
		})
		setCrenaux(crenaux1);
    }
	} 


	const checkColor = (dispo) => {
		if (dispo == "disponible"){
			return "green";
		}
		else {
			return "red";
		}
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
	function heure_to_ms(heure) {
		let h = heure.split("h");
		let ms = 0;
		ms = (h[0] * 3600 + h[1] * 60) * 1000;
		return ms;
	}

	function msToTime(duration) {
		var milliseconds = parseInt((duration % 1000) / 100),
			seconds = Math.floor((duration / 1000) % 60),
			minutes = Math.floor((duration / (1000 * 60)) % 60),
			hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
		return (
			(hours < 10 ? "0" + hours : hours) +
			":" +
			(minutes < 10 ? "0" + minutes : minutes) +
			":" +
			(seconds < 10 ? "0" + seconds : seconds)
		);
	}
	
	function calcul_debut(creneau_reserved, i){
		// console.log(creneau_reserved, i)
		let creneau_reserved_split = creneau_reserved.split(" ");
		if( i == 0 ){
			// replace h per :
			let heure = creneau_reserved_split[0].replace("h", ":");
			return heure + ":00";
		}
		else {
			let res = heure_to_ms(creneau_reserved_split[0]);
			// convert i to ms
			let i_ms = (100*1000) * i + res;
			let response = msToTime(i_ms);
			return response;
		}
	}

	const [crenaux_disponible, setCrenaux_disponible] = useState(0);
    const onClickHandlerReservation = (creneau_reserved, i, act_dispo) => {
		let crenaux_indisponible = 0;
		setCrenaux_disponible(0);
		let crenaux_disponible = 0;
		if (act_dispo == "disponible") {
			let res = calcul_debut(creneau_reserved, i);
			setDebut(res);
			const pizza_and_pos = {};
			crenaux.map((creneau, idx_creneau) => {
				if (creneau.horaire == creneau_reserved) {
					creneau.disponibilité.map((dispo, index_dispo) => {
						if (index_dispo === i){
							for(let y = 0; y < number_pizzas; y++){
								
								if (index_dispo > 5){
									index_dispo = 0;
									idx_creneau += 1;	
								}
								// console.log(dispo,idx_creneau, index_dispo)
								// console.log(crenaux[idx_creneau].disponibilité[index_dispo])
								if (crenaux.length == idx_creneau){ 
									console.log("fin")
									crenaux_indisponible += 1;
									return 
								}
								if( idx_creneau == 21){
									if (dispo != "disponible"){
										crenaux_indisponible += 1;
									}
									else {
										crenaux_disponible += 1;
									}	
								}
								else {
									if (crenaux[idx_creneau].disponibilité[index_dispo] != "disponible"){
										crenaux_indisponible += 1;
									}
									else {
										crenaux_disponible += 1;
									}
								}
								pizza_and_pos[y] = {
									"pizza" : pizzas_name[y],
									"pizza_note" : pizzas_note[y],
									"creneau" : crenaux[idx_creneau].horaire.split(" ")[0],
									"creneau_idx" : index_dispo,
									"taille" : pizzasTaille[y],
								}
								index_dispo += 1;
							}				
							let res = calcul_debut(crenaux[idx_creneau].horaire, index_dispo);
							setFin(res);
						}
					})			
				}
			})
			if (crenaux_indisponible > 0){
				setCrenaux_disponible(crenaux_disponible);
				setmodalisOpenFalse(true);
			}
			else {
			setLst_pizza_object(Object.assign({}, pizza_and_pos));
			setCrenaux([...crenaux]);
			setmodalisOpen(true);
		} 
	}

    }

	const [client, setclient] = useState('');
	const handleChangeGetClientName = event => {
		setclient(event.target.value);	
	  };

	const [info_Supp, setInfo_supp] = useState('');
	const handleChangeInfoSupp = event => {
		setInfo_supp(event.target.value);
	};

	const [dateAvance, setDateAvance] = useState("18:00");
	const onChangesetDateAvance = (date) => {
		setDateAvance(date);
	}

	const [dateAvance2, setDateAvance2] = useState(3);
	const setAvance = (avance) => {
		setDateAvance2(avance);
	}

	function getDispo(){

		let input1 = dateAvance+":00";
		let input2 = dateAvance2;
		let tmp_dispo = 0
		let tmp_fin
		let tmp_indispobible = 0
		crenaux.map((creneau, index) => {
			if (creneau.horaire.split(" - ")[0] >= input1){
				if(tmp_dispo == input2){ 
					return
				 }
				creneau.disponibilité.map((dispo, idx) => {
					if (tmp_dispo < input2){
						if (dispo == "disponible" ){
							tmp_dispo += 1
							tmp_fin = calcul_debut(creneau.horaire, idx+1);	
						}
						else {
							tmp_indispobible += 1
						}
					}
					if (tmp_dispo == input2){
						return
					}
				})
			}
		})
		if (tmp_indispobible == 0){
			alert("Il n'y as rien as deplacer")
			return
		}

		console.log(tmp_dispo, tmp_indispobible)
		let res = date + "T" + tmp_fin + ".000Z";
		let sorted_data = data.sort((a, b) => {
			return new Date(b.attributes.debut_resa) - new Date(a.attributes.debut_resa);
		});
		let tmp_data = []
		sorted_data.map((resa, idx) => {
			if (new Date(resa.attributes.debut_resa) < new Date(res)){
				tmp_data.push(resa)
			}
		})
		
		// subtract two dates and return the difference in minutes and seconds
		let difference = new Date(res) - new Date(tmp_data[0].attributes.fin_resa);
		// divide the difference by 100 seconds
		let secondeDifference = Math.floor(difference / 1000 / 100);
		// console.log(secondeDifference)

		// transform into minutes and seconds
		// let minutes = Math.floor(difference / 1000 / 60);
		// let seconds = Math.floor(difference / 1000) - minutes * 60;
		// // divide minutes and seconds per 100 
		// console.log(minutes, seconds)
		console.log(tmp_data[0].attributes.fin_resa, res)
		console.log(tmp_data)
		tmp_data.map((resa, index) => {
			const datas = {"data":{}};
			datas.data.id = resa.id;
			// console.log(datas.data.debut_resa)

			datas.data.debut_resa = "";
			// add 1 minutes, 40 secondes * input2 to resa.attributes.debut_resa
			let tmp_debut = new Date(resa.attributes.debut_resa)
			tmp_debut.setMinutes(tmp_debut.getMinutes() + 1*secondeDifference);
			tmp_debut.setSeconds(tmp_debut.getSeconds() + 40*secondeDifference);
			tmp_debut = tmp_debut.toISOString();
			// console.log(tmp_debut)
			datas.data["debut_resa"] = tmp_debut
			// add 1 minutes, 40 secondes * input2 to resa.attributes.fin_resa
			let tmp_fin = new Date(resa.attributes.fin_resa)
			tmp_fin.setMinutes(tmp_fin.getMinutes() + 1*secondeDifference);
			tmp_fin.setSeconds(tmp_fin.getSeconds() + 40*secondeDifference);
			tmp_fin = tmp_fin.toISOString();
			// console.log(tmp_fin)
			datas.data["fin_resa"] = tmp_fin

			console.log(datas, resa.id)
			updateById(datas, resa.id)
		})
		// reload page
		setTimeout(function(){
			window.location.reload();
		}
		, 3000);
	}

console.log(crenaux)
	function updateById(datas, id){
		axios({
			method: 'put',
			url: `${API}/reservations/${id}`,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			data : datas
		})
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
		// make five second delay
	}

	const clickHandlerConfirmed_Resa = () => {
		// if client name is empty
		if (client == ''){
			alert("Veuillez renseigner votre nom");
		}
		else{
		console.log(date + debut)
		let date_debut = date + "T" + debut + ".000Z";
		let date_fin = date + "T" + fin + ".000Z";
		console.log(lst_pizza_object);
		const datas = {
			"data":
			{
				"debut_resa":date_debut,
				"fin_resa":date_fin,
				"pizzas_reserved":lst_pizza_object,
				"client":client,
				"informations":info_Supp,
				"prix_total":prix_total,
			}}
		axios({
			method: 'post',
			url: `${API}/reservations`,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			data : datas,
		})
			.then(response => {
				// Handle success.
				// console.log("success");
				console.log(response);
				// vider pizzas du local storage
				localStorage.removeItem('pizzas');
				// navigate to display planning
				navigate("/reservation");
			})	
			.catch(error => {
				// Handle error.
				console.log("An error occurred:", error.response);
			});
		}}
	return (
		// display pizzas in card
		<div className="plannings">
			<div className="planning__containers">
				<div className="planning__container__title">
					<h1>Planning</h1>
					<p>Le temps de préparation est de {prep_time}</p>
					{/* <span>avancer toutes les commandes de </span>
					<span>reculer toutes les commandes de </span> */}
					<input 
          				type="date"
          				id='resa'
						value={date}
          				onChange={(e) => setDateQuery(e.target.value)}
          			/>

					{/* <input 
						type="time" id="appt" name="appt"
       					min="18:00" max="22:00"
						onChange={(e) => onChangesetDateAvance(e.target.value)}
						value={dateAvance}
					/>
					<input
						type="number"
						min="0"
						max="3"
						value={dateAvance2}
						onChange={(e) => setAvance(e.target.value)}
					/>
					<button onClick={getDispo}>Avancer</button> */}
					{modalisOpen && (
       					<div className="popup">
							<div className="popup_container">		
        						<div className="popup_content">
          							{/* display le debut la fin avec un format sympa + les pizza et leur quantité */}
									<h5>Récapitulaitf de la commande : </h5>
									{pizzas.map((pizza, index) => (
										<p key={index}>{pizza.quantity} {pizza.name}</p>
									))}
									<p>Le temps de préparation est de {prep_time}</p>
									{/* SET LE DEBUT IT'S OKAY MAINTENANT SET LA FIN */}
									<p>Reservation du {date} de {debut} à {fin} pour  pizzas</p>
									<div className="popup_input">
										<label 
									    style={{  borderRadius: "5px", outline: "none", fontSize: "16px", color: "#333", fontWeight: "300", letterSpacing: "1px",  textAlign: "center", padding: "10px 20px", display: "inline-block", margin: "10px 10px 10px 0" }}
										htmlFor="">Informations supplementaires optionnel</label>

										<input
										style={{marginBottom: "10px", padding: "20px", width: "100%", borderRadius: "5px", border: "1px solid #ccc", outline: "none", fontSize: "10px", color: "#333", fontWeight: "300", letterSpacing: "1px", textTransform: "uppercase", textAlign: "center", transition: "all 0.3s ease-in-out", boxShadow: "0 0 10px rgba(0,0,0,0.1)", backgroundColor: "#fff"}}
										type="text"
										placeholder="informations relatives à la commande" 
										onChange={handleChangeInfoSupp}/>

										<label style={{  borderRadius: "5px", outline: "none", fontSize: "16px", color: "#333", fontWeight: "300", letterSpacing: "1px",  textAlign: "center", padding: "10px 20px", display: "inline-block", margin: "10px 10px 10px 0" }}>
											Renseigner un nom client
										</label>

										<input 
											style={{marginBottom: "10px", padding: "5px", width: "50%", borderRadius: "5px", border: "1px solid #ccc", outline: "none", fontSize: "16px", color: "#333", fontWeight: "300", letterSpacing: "1px", textTransform: "uppercase", textAlign: "center", transition: "all 0.3s ease-in-out", boxShadow: "0 0 10px rgba(0,0,0,0.1)", backgroundColor: "#fff"}}
											onChange={handleChangeGetClientName}
											value={client}
											type="text" 
										/>

									</div>
        						</div>
								
								<button	onClick={() => clickHandlerConfirmed_Resa("nom_client")}>
          							Reservation
        						</button>
        						<button onClick={() => setmodalisOpen(false)}>
          							Cancel
        						</button>
							</div>
       					</div>
      				)}
					{modalisOpenFalse && (
       					<div className="popup_false">
							<div className="popup_container_false">		
        						<div className="popup_content_false">
									<h2 style={{color : 'red'}}>Crenaux Indisponible</h2>
									<h5>Le creneau que vous avez selectionnée contient {crenaux_disponible} pizzas disponible</h5>
									<h5>Votre reservation contient {pizzas_name.length}</h5>
									<h4>Veuillez prendre un creneau avec assez de disponibilité ou contacter la pizzeria</h4>
        						</div>
        						<button onClick={() => setmodalisOpenFalse(false)}>
          							C'est compris
        						</button>
							</div>
       					</div>
      				)}
                    <div className="planning_container_week">
                        {/* foreach and display creneaux */}
						{/*  */}
						{crenaux.map((creneau, i) => (
							<div className="planning_card">
								<div className="planning_card_title">
									<span>{creneau.horaire}</span>
								</div>
								<div className="planning_card_body">
									<span>{creneau.count_indisponible}</span>
									{creneau.disponibilité.map((dispo, i) => (
										<div 
											 onClick={() => onClickHandlerReservation(creneau.horaire, i, dispo)} 
											 className="display_pizza_rerserved"
											 style={{ border: "2px solid #ccc"}}>
											<span style={{ color: `${checkColor(dispo)}`}} >{dispo}</span>
										</div>
									))}
								</div>
							</div>
						))}
                    </div>
				</div>
			</div>
		</div>
	);
};

export default Planning;