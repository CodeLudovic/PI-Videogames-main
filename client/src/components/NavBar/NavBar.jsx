import style from "./NavBar.module.css";
import { SearchBar } from "./SearchBar";
import logoImg from "../../assets/logo.png";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
	filterVgGender,
	filterVgSrc,
	orderByAsdc,
	resetVG,
} from "../../redux/actions/actions";
import { genresHelper } from "../../helpers/utils";
import { useEffect, useState } from "react";
import { setAllGenres } from "../../redux/actions/actions";

/* eslint-disable */
export const NavBar = ({ setInput }) => {
	const [source, setSource] = useState("By Source");
	const dispatch = useDispatch();
	const [genres, setGenres] = useState([]);

	function handlerOrder(e) {
		dispatch(orderByAsdc(e.target.value));
	}

	function handlerFilterByGender(e) {
		dispatch(filterVgGender(e.target.value));
	}

	function handlerFilterBySource(e) {
		dispatch(filterVgGender(e.target.value));
	}

	function handlerSource() {
		if (source === "By Source") {
			setSource("Api");
			dispatch(filterVgSrc("Api"));
			setInput(1);
		}
		if (source === "Api") {
			setSource("DB");
			dispatch(filterVgSrc("DB"));
			setInput(1);
		}
		if (source === "DB") {
			setSource("By Source");
			dispatch(resetVG());
			setInput(1);
		}
	}

	function handlerReset() {
		const selectGender = document.getElementById("genderSelect");
		selectGender.value = "Gender";
		const selectOrder = document.getElementById("selectOrder");
		selectOrder.value = "Order";
		setSource("By Source");
		dispatch(resetVG());
	}

	useEffect(() => {
		async function fetchGenres() {
			try {
				const fetchedGenres = await genresHelper();
				setGenres(fetchedGenres);
			} catch (error) {
				console.log("Error on genres response");
			}
		}
		fetchGenres();
		dispatch(setAllGenres(genres.response));
	}, []);
	const location = useLocation();
	const id = useParams().id;
	return (
		<div className={style.container}>
			<NavLink to="/home" className={style.nav_link}>
				<div className={style.logo_banner}>
					<div>Code</div>
					<img src={logoImg} className={style.logoImg} />
					<div>Games</div>
				</div>
			</NavLink>
			{location.pathname === "/videogames/create" ||
			location.pathname === `/videogames/detail/${id}` ? (
				""
			) : (
				<>
					<NavLink to="/videogames/create">
						<button className={style.button_create}>Create Game!</button>
					</NavLink>
					<div className={style.divButtons}>
						<button onClick={handlerSource} className={style.button_source}>
							{source}
						</button>
						<div>
							<select
								id="selectOrder"
								className={style.select}
								defaultValue="Order"
								onChange={handlerOrder}>
								<option value="Order">Order</option>
								<option value="A">By Name Asc</option>
								<option value="D">By Name Desc</option>
								<option value="RA">By Rating Asc</option>
								<option value="RD">By Rating Desc</option>
							</select>
						</div>
						<div>
							<select
								id="genderSelect"
								className={style.select_gender}
								onChange={handlerFilterByGender}>
								<option value="Gender" disabled selected>
									Gender
								</option>
								<option value="All">All</option>
								{genres.response?.map((genre, index) => (
									<option key={index} value={genre.name}>
										{genre.name}
									</option>
								))}
							</select>
						</div>
						<button
							onClick={() => handlerReset()}
							className={style.button_reset}>
							Reset
						</button>
					</div>

					<div className={style.searchBar}>
						<SearchBar />
					</div>
				</>
			)}
		</div>
	);
};
