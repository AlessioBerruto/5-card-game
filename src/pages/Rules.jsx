import React from "react";
import { Link } from "react-router-dom";

const Rules = () => {
	return (
		<>
			<div className="rules-page">
				<div className="description-column">
					<p>
						<h1 className="description-title">REGOLE CINQUE</h1>
						Si gioca con 2 mazzi da 54 carte ciascuno (13 carte per ognuno dei 4
						semi e due jolly)
						<br />
						<br />- <strong>Inizio partita:</strong> Tutti gli assi vengono posizionati sul campo
						di gioco, dopo aver mescolato il mazzo, vengono creati 2 mazzetti
						per giocatore da 5 carte ciascuno e posizionati a faccia in giù sul
						campo.
						<br />
						<br />- Un giocatore casuale sceglierà uno dei mazzetti, decidendo
						se posizionarlo coperto di fronte a sé oppure se sarà la sua mano
						iniziale. In senso orario ogni altro giocatore effettuerà questa
						scelta finché i mazzetti saranno finiti.
						<br />
						<br />- Il giocatore che ha scelto l'ultimo mazzetto inizia per
						primo pescando una carta, procedendo poi a posizionare una o più
						carte per continuare una scala esistente (rispettando il seme e la
						successione della carta nella scala) e finendo il turno scartando
						una carta. Il giocatore successivo in senso orario esegue lo stesso
						procedimento.
						<br />
						<br />- Un giocatore non può scartare una carta che attacca sul
						campo di gioco (inclusi i jolly)
						<br />
						<br />- Quando un giocatore termina le carte scartando l'ultima
						carta che ha in mano, il turno successivo pescherà 5 carte dal mazzo
						(girando la prima carta del mazzetto di fronte in caso non ne avesse
						ancora rivelate)
					</p>
				</div>
				<div className="description-column">
					<p>
						- Quando un giocatore termina le carte posizionando l'ultima carta
						che ha in mano sul campo di gioco, può pescare immediatamente 5
						carte dal mazzo e continuare il proprio turno (girando la prima
						carta del mazzetto di fronte in caso non ne avesse ancora rivelate).
						In caso riuscisse nuovamente a finire le carte in mano in questo
						modo, può ripetere il procedimento appena descritto.
						<br />
						<br />- Un jolly può essere giocato come carta “sostitutiva” di
						un'altra (se giocato dalla mano, non vi è obbligo che si attacchi
						una carta subito dopo di esso). In caso un giocatore abbia tale
						carta (numero o figura) in mano o nel mazzetto di fronte a sé, può
						sostituire quella carta con il jolly (e posizionare il jolly in mano
						o nel mazzetto di fronte in base alla posizione originale della
						carta scambiata)
						<br />
						<br />- Fintanto che un jolly si trova rivelato nel mazzetto di
						fronte (presente inizialmente nel mazzetto o posizionato lì dopo uno
						scambio), il giocatore per giocarlo da quella posizione dovrà
						attaccarlo ad una carta e aggiungerne un'altra in successione per
						creare una scala coerente per numero e seme (in caso di due o più
						jolly, il posizionamento deve necessariamente terminare con un
						numero corretto nella scala)
						<br />
						<br />- Quando il mazzo principale finisce, la pila degli scarti
						viene mescolata e prende il posto del mazzo principale
						<br />
						<br />- <strong>Fine partita:</strong> Quando un giocatore finisce le carte nel mazzetto di fronte
						e termina le carte che ha in mano scartando l'ultima, quel giocatore
						ha vinto la partita
					</p>
				</div>
			</div>
			<footer>
				<Link to="/game" className="navbar-link">
					Game
				</Link>
			</footer>
		</>
	);
};

export default Rules;
