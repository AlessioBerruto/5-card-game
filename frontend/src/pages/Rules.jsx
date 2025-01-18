import React from "react";
import { Link } from "react-router-dom";
import inizioPartita from "/assets/cinque-inizio.png";
import esempioTurno from "/assets/cinque-un-turno.png";
import manoFinita from "/assets/cinque-mano-finita.png";
import ultimaMano from "/assets/cinque-ultima-mano.png";
import partitaFinita from "/assets/cinque-partita-finita.png";

const Rules = () => {
	return (
		<>
			<div className="rules-page">
				<h1 className="description-title">REGOLE CINQUE</h1>

				<div className="description-column">
					<dl>
						<dd>
							<dt>Obiettivo del gioco:</dt>
							<li>
								Ogni giocatore dovrà finire le carte del proprio mazzetto
								coperto e scartare l'ultima carta dalla mano prima degli
								avversari. Durante la partita, potrà ostacolare il gioco
								avversario impedendo la continuazione delle scale utili agli
								altri e/o attaccare il doppione della carta del mazzetto coperto
								dell'avversaro prima di lui.
							</li>
						</dd>
						<dd>
							<dt>Inizio partita:</dt>
							<li>
								Si gioca con 2 mazzi da 54 carte ciascuno (13 carte per ognuno
								dei 4 semi e due jolly, in ogni mazzo)
							</li>
							<li>
								Tutti gli assi vengono posizionati sul campo di gioco, dopo aver
								mescolato il mazzo, vengono creati (e posizionati a faccia in
								giù sul campo) 2 mazzetti da 5 carte ciascuno, per giocatore. Le
								carte restanti formeranno il mazzo principale che verrà
								posizionato a faccia in giù sul campo di gioco.
							</li>
						</dd>

						<li>
							Un giocatore casuale sceglierà uno dei mazzetti, decidendo se
							posizionarlo coperto di fronte a sé oppure se sarà la sua mano
							iniziale. In senso orario ogni altro giocatore effettuerà questa
							scelta finché i mazzetti saranno finiti e ognuno avrà un mazzetto
							coperto e la mano iniziale.
						</li>
						<div className="example-img">
							<img src={inizioPartita} alt="5 inizio partita" />
						</div>
						<li>
							Il giocatore che ha scelto l'ultimo mazzetto inizia per primo
							pescando una carta, scegliendo se posizionare una o più carte per
							continuare una scala esistente (rispettando il seme e la
							successione della carta nella scala) e finendo il turno scartando
							una carta (che verrà posizionata a faccia in su nella pila degli
							scarti). Il giocatore successivo in senso orario esegue lo stesso
							procedimento.
						</li>
						<div className="example-img">
							<img src={esempioTurno} alt="5 esempio di turno" />
						</div>
						<li>
							Quando un giocatore termina le carte che ha in mano:
							<br />- se le finisce scartando l'ultima carta, il turno
							successivo pescherà 5 carte dal mazzo (girando la prima carta del
							mazzetto coperto in caso non ne avesse ancora rivelate)
							<br />- se invece le finisce attaccando l'ultima carta, può
							pescare immediatamente 5 carte dal mazzo e continuare il proprio
							turno (girando la prima carta del mazzetto coperto in caso non ne
							avesse ancora rivelate). Questo procedimento può essere ripetuto
							più volte.
						</li>
						<div className="example-img">
							<img src={manoFinita} alt="5 mano finita" />
						</div>

						<li>
							Le carte del mazzetto coperto vengono rivelate una alla volta.
							Quando viene rivelata la prima carta, l'obiettivo è quello di
							attaccarla nel campo di gioco il prima possibile. Attaccata la
							prima si rivela quella successiva e si continua così fino
							all'esaurimento del mazzetto.
						</li>
						<div className="example-img">
							<img src={ultimaMano} alt="5 mazzetto finito" />
						</div>
						<li>
							Quando il mazzo principale finisce, la pila degli scarti viene
							mescolata e prende il posto del mazzo principale.
						</li>
						<dd>
							<dt>Fine partita:</dt>
							<li>
								Il gioco finisce quando un giocatore che ha finito tutte le
								carte del mazzetto coperto, termina le carte che ha in mano
								scartando l'ultima. Quel giocatore ha vinto la partita.
							</li>
						</dd>
						<div className="example-img">
							<img src={partitaFinita} alt="5 fine partita" />
						</div>
						<dd>
							<dt>Regole aggiuntive:</dt>
						</dd>
						<li>
							Un giocatore non può scartare una carta che attacca sul campo di
							gioco (inclusi i jolly)
						</li>
						<li>
							I jolly vengono giocati come carta “sostitutiva” di un'altra. In
							caso un giocatore abbia tale carta (numero o figura) in mano o nel
							mazzetto di fronte a sé, può mettere quella carta al posto del
							jolly e posizionare il jolly in mano o nel mazzetto di fronte in
							base alla posizione originale della carta scambiata.
						</li>
						<li>
							Il jolly giocato dalla mano può essere attaccato ovunque senza
							condizioni.
						</li>
						<li>
							Il jolly che si trova rivelato nel mazzetto coperto, può essere
							attaccato ad una qualsiasi scala a condizione che venga attaccato
							con una carta della scala (es. 1: 5, Jolly, 7) ; (es. 2: 9, jolly,
							jolly, Q)
						</li>
					</dl>
				</div>
				<footer>
					<Link to="/game" className="footer-link">
						↱ Torna al gioco ↰
					</Link>
				</footer>
			</div>
		</>
	);
};

export default Rules;
