import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASEURL_LOC } from "../../helpers/data";
import style from "./Detail.module.css";
import { NavBar } from "../../components/NavBar/NavBar";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
/* eslint-disable*/
export const Detail = () => {
	const [videogame, setVideoGame] = useState({});
	const nagivate = useNavigate();
	const { id } = useParams();
	const htmlContent = { __html: videogame.description_raw };
	const [loading, setLoading] = useState(true);
	const handleClick = () => {
		nagivate(-1); // Retrocede una página en la historia de navegación
	};

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1500);
	}, []);

	useEffect(() => {
		axios(`${BASEURL_LOC}${id}`)
			.then(({ data }) => {
				if (data.id) {
					setVideoGame(data);
				} else {
					window.alert("No hay personajes con ese ID");
				}
			})
			.catch((error) => {
				if (error.response || error.response.status === 404) {
					nagivate("/home");
				}
			});
		// for (let i = 0; i < videogame.genres.length; i++) {
		// 	genres += videogame.genres[i].name;
		// }

		return setVideoGame({});
	}, [id]);

	console.log(videogame.platforms);
	return (
		<div className={style.container}>
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
				<>
					<div
						className={style.alexander}
						style={{
							backgroundImage: `url(${videogame.background_image})`,
						}}></div>
					<div className={style.navbar}>
						<NavBar />
					</div>
					<div className={style.detail_container}>
						<div className={style.header_detail}>
							<div>
								<button
									onClick={() => handleClick()}
									className={style.button_back}>
									Go Back
								</button>
								<div className={style.genres_1}>
									<div className={style.tittle_genres}>Plaforms:</div>
									{videogame.parent_platforms?.map((platform, index) => (
										<div key={index}>
											<text style={{ color: "white" }}>!* </text>
											{/* {platform.platform.name === "Xbox Series S/X"
												? "Xbox S/X"
												: platform.platform.name === "PlayStation 5"
												? "PS5"
												: platform.platform.name === "PlayStation 4"
												? "PS4"
												: platform.platform.name === "Xbox One"
												? "Xbox One"
												: platform.platform.name === "PC"
												? "PC"
												: platform.platform.name === "PC"} */}
											{platform.platform.name === "PlayStation"
												? "PS4/PS5"
												: platform.platform.name === "Apple Macintosh"
												? "macOS"
												: platform.platform.name}
											<text style={{ color: "white" }}> *!</text>
										</div>
									))}
								</div>
							</div>

							<img
								className={style.imageDetail}
								src={videogame.background_image}
							/>
							<div className={style.genres}>
								<div className={style.tittle_genres}>Genres:</div>
								{videogame.genres?.map((genre, index) => (
									<div key={index}>
										<text style={{ color: "white" }}>!*</text>{" "}
										{genre.name === "Massively Multiplayer"
											? "MMO"
											: genre.name}
										<text style={{ color: "white" }}> *!</text>
									</div>
								))}
							</div>
						</div>
						<div className={style.text_name_detail}>
							{videogame.name} - ID:{videogame.id}
						</div>

						<div
							className={style.text_description_detail}
							dangerouslySetInnerHTML={htmlContent}></div>
						<div className={style.footer_detail}>
							<div className={style.text_release_detail}>
								Released:{" "}
								<text className={style.text_released}>
									{videogame.released}
								</text>
							</div>
							<div className={style.text_rating_detail}>
								Rating:{" "}
								<text className={style.text_rating}>
									{[...new Array(5)].map((star, index) => {
										return index < Math.floor(Number(videogame.rating)) ? (
											<AiFillStar />
										) : (
											<AiOutlineStar />
										);
									})}
								</text>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};
