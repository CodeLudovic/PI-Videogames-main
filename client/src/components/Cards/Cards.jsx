/*eslint-disable*/
import style from "./Cards.module.css";
import { Card } from "../Card/Card";
import { useEffect, useState } from "react";

import { paginationVGS } from "../../redux/actions/actions";

export const Cards = ({ videogames }) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Simula una carga de cartas (aquí puedes realizar una solicitud a una API)
		setTimeout(() => {
			setLoading(false); // Una vez cargadas las cartas, actualiza el estado
		}, 1000); // Simulación de carga de 2 segundos
	}, []);

	if (videogames !== null && videogames !== undefined) {
		return (
			<div className={style.container} style={{ gridTemplateColumns: "1fr" }}>
				{loading ? (
					<div className={style.loaderDiv}>
						<div>
							<h1 className={style.loadingTitle}>Loading</h1>
						</div>
						<div>
							<span className={style.loader}></span>
						</div>
					</div>
				) : (
					<div className={style.container}>
						{videogames?.map((videogame) => (
							<Card key={videogame.id} item={videogame} />
						))}
					</div>
				)}
			</div>
		);
	}
};
