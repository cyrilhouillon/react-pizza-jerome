import React from "react";
import axios from 'axios';
import { API } from "../constant";
import { useState, setState, useEffect} from 'react';
import "./Planning.css"
import { useNavigate } from "react-router-dom";
import { timeIncrements } from "./DefaultPlanning";
import { timeIncrements1 } from "./DefaultPlanning";
// import { DefaultPlanning } from "./DefaultPlanning";

const  Planningv2 = () => {
	
	const navigate = useNavigate();	
	let retrievedObject = localStorage.getItem('pizzas');
	const [pizzas_name, setPizzasname] = useState([]);
	const [pizzas_note, setPizzasnote] = useState([]);
	const [pizzas, setPizzas] = useState(JSON.parse(retrievedObject));
    const [date, setDate] = useState(get_date_formated_today());
	const [modalisOpen, setmodalisOpen] = useState(false);
	const [modalisOpenFalse, setmodalisOpenFalse] = useState(false);
	const [debut, setDebut] = useState("");	
	const [fin, setFin] = useState("");
	const [lst_pizza_object, setLst_pizza_object] = useState({});
	
	const navigateValidate = () => {
		navigate('/reservation');
	}

	function get_date_formated_today(){
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0');
		let yyyy = today.getFullYear();
		today = yyyy + '-' + mm + '-' + dd;
		return today;
	}
     
	const [data, setData] = useState([]);
	const [prix_total, set_prix_total] = useState(0)
	useEffect(()=>{
        const loadReserved = async (date) => {
            const response = await axios.get(`${API}/reservations?filters[debut_resa][$containsi]=${date}`);
			setData(response.data.data);
			update_dispo(response.data.data)

        }
        loadReserved(date);
    }
    ,[date]);
	
	const setDateQuery = (e) => {
		setDate(e);
	}

	function to_restore_by_default_planning(){
		timeIncrements.map((anObjectMapped, index) => {
			anObjectMapped.dispo = 6
		})
	}
	
	function update_dispo(data_reserver){
		to_restore_by_default_planning()
		// console.log(data_reserver)
		// console.log(timeIncrements)
		timeIncrements.map((anObjectMapped, index) => {
			// console.log(anObjectMapped.creneau,anObjectMapped.dispo, index)
			data_reserver.map((obj, idx) => {
				// console.log(anObjectMapped.creneau.split("-")[0])
				// console.log(obj.attributes.debut_resa.split("T")[1].split(".")[0].replace(":", "h").split(":")[0].replace("h", ":"))
				if(obj.attributes.debut_resa.split("T")[1].split(".")[0].replace(":", "h").split(":")[0].replace("h", ":") == anObjectMapped.creneau.split("-")[0].replace(" ", "")){
					console.log(obj.attributes.debut_resa.split("T")[1].split(".")[0].replace(":", "h").split(":")[0].replace("h", ":"), anObjectMapped.creneau.split("-")[0].replace(" ", ""))
					let y = 0
					Object.keys(obj.attributes.pizzas_reserved).map((pizza,idx) =>{
						// console.log(pizza, idx)
						y += 1
					})
					anObjectMapped.dispo = anObjectMapped.dispo - y
				}
			})
		})
	}
	
	function getQuantity(pizz){
		let quantity = 0
		pizz.map((p) =>{
			quantity += p.quantity
		})
		return quantity
	}

	function checkdispo(creneau_reserved){
		
		let quantity = getQuantity(pizzas)

		if(quantity < timeIncrements[creneau_reserved].dispo){
			return true			
		}
		else{
			return false
		}
	}

	function convert_hour_and_minutes_into_date_format(stringDate){
		const timeArray = stringDate.split(".");
		const hour = timeArray[0];
		const minute = timeArray[1];
		const date = new Date();
		let h = date.setHours(hour);
		date.setMinutes(minute);
		return date
	}

	function getTimeToInsert(creneau_reserved){
		let debut = timeIncrements[creneau_reserved].creneau.split("-")[0].trim().replace(":", ".")
		let date_debut = convert_hour_and_minutes_into_date_format(debut)

		let fin = timeIncrements[creneau_reserved].creneau.split("-")[1].trim().replace(":", ".")
		let date_fin = convert_hour_and_minutes_into_date_format(fin)

		data.map((d) => {
			let fin_resa = d.attributes.fin_resa.split("T")[1].split(".")[0].replace(":", ".").replace(":", ".") 
			let date_fin_resa = convert_hour_and_minutes_into_date_format(fin_resa)
			if(date_debut.getTime() < date_fin_resa.getTime() && date_fin_resa.getTime() < date_fin.getTime()){
				return d.attributes.fin_resa.split("T")[1].split(".")[0]
			}

		})	
	}

	const [crenaux_disponible, setCrenaux_disponible] = useState(0);
    const onClickHandlerReservation = (creneau_reserved) => {
		// console.log(timeIncrements[creneau_reserved])
		// console.log("New planning", timeIncrements)
		// console.log("Réservation", pizzas)

		// calcul debut de la reservation en prenant le debut de l'heure clicker
		// pour incrementer sur tout les possibilité du creneaux
		// check if have a dispo if not check if you can decale de 3 après toute les autres sinon mesage impossible même decaller 
		
		if(checkdispo(creneau_reserved)){
			let debut = timeIncrements[creneau_reserved].creneau.split("-")[0].trim().replace(":", ".")
			let date_debut = convert_hour_and_minutes_into_date_format(debut)
			let fin = timeIncrements[creneau_reserved].creneau.split("-")[1].trim().replace(":", ".")
			let date_fin = convert_hour_and_minutes_into_date_format(fin)
			if(timeIncrements[creneau_reserved].dispo == 6){
				console.log(timeIncrements[creneau_reserved].creneau.split("-")[0].trim())
			}
			else{
			data.map((d) => {
				let fin_resa = d.attributes.fin_resa.split("T")[1].split(".")[0].replace(":", ".").replace(":", ".") 
				let date_fin_resa = convert_hour_and_minutes_into_date_format(fin_resa)
				if(date_debut.getTime() < date_fin_resa.getTime() && date_fin_resa.getTime() < date_fin.getTime()){
					let time = d.attributes.fin_resa.split("T")[1].split(".")[0]
					console.log(time)
				}
		})}
		}

	// Get all resa check dispo
	// 3 MSG
		// plannifier de -- a --
			
		// êtes vous sur de plannifier de -- a -- cette commande va prendre du retard sur les reservation de tel heure tel heure et ....
		
		// imposible de planifier même en prenant du retard veuillez choisir un autre crenaux		
    
	
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
	}

	const clickHandlerConfirmed_Resa = () => {
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
					<input 
          				type="date"
          				id='resa'
						value={date}
          				onChange={(e) => setDateQuery(e.target.value)}
          			/>
					{modalisOpen && (
       					<div className="popup">
							<div className="popup_container">		
        						<div className="popup_content">
          							{/* display le debut la fin avec un format sympa + les pizza et leur quantité */}
									<h5>Récapitulaitf de la commande : </h5>
									{pizzas.map((pizza, index) => (
										<p key={index}>{pizza.quantity} {pizza.name}</p>
									))}
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
						{Object.keys(timeIncrements).map((crenau, i) => (
							<div className="planning_card">
								<div className="planning_card_title">
									<span
										className="header_count_nbr_pizza"
									>{timeIncrements[i].creneau}</span>
								</div>
								<div className="planning_card_body">
									<span
										className="count_nbr_pizza"
										onClick={() => onClickHandlerReservation(i)}
										> Pizza reservable : {timeIncrements[i].dispo}
									</span>
								</div>
							</div>
						))}
                    </div>
				</div>
			</div>
		</div>
	);
};
export default Planningv2;