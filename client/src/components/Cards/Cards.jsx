/*eslint-disable*/
import style from "./Cards.module.css";
import { Card } from "../Card/Card";
import { useEffect, useState } from "react";

export const Cards = ({ videogames, porPagina, pagina }) => {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 3500);
		return () => {};
	}, []);

	return (
		<div className={style.container} style={{ gridTemplateColumns: "1fr" }}>
			{loading ? (
				<div className={style.loaderDiv}>
					<div>
						<h1 key={pagina} className={style.loadingTitle}>
							Loading
						</h1>
					</div>
					<div>
						<span className={style.loader}></span>
					</div>
				</div>
			) : (
				<div className={style.container}>
					{videogames.length > 0 ? (
						videogames
							.slice(
								(pagina - 1) * porPagina,
								(pagina - 1) * porPagina + porPagina
							)
							.map((videogame) => <Card key={videogame.id} item={videogame} />)
					) : (
						<>
							<div></div>
							<div></div>
							<div className={style.noElements}>
								No hay elementos disponibles
							</div>
						</>
					)}
				</div>
			)}
		</div>
	);
};
