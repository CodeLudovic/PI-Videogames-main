import style from "./LandingPage.module.css";
import bckImg from "../../assets/image.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { paginationVGS } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";

export const LandingPage = () => {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const acmvgs = useSelector((state) => state.videoGames);
	useEffect(() => {
		if (acmvgs) {
			dispatch(paginationVGS(acmvgs));
			setTimeout(() => {
				setLoading(false);
			}, 4700);
		}
	}, []);
	return (
		<div className={style.container}>
			<span className={style.span}>&lt; Bienvenido a CodeGames! /&gt;</span>
			<div
				// prettier-ignore
				className={`${style.loaderDiv}${ loading ? '': style.loaderDiv_fadeOut}`}>
				{loading ? (
					<div className={style.loading}>
						Loading Games Data<span className={style.loader}></span>
					</div>
				) : null}
			</div>
			<img src={bckImg} className={style.img} />
			{!loading && (
				<Link to="/home">
					<button className={style.button}> Go Home!</button>
				</Link>
			)}
		</div>
	);
};
