import style from "./NavBar.module.css";
import { SearchBar } from "./SearchBar";
import logoImg from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { orderByAsdc, orderByRating } from "../../redux/actions/actions";
/* eslint-disable */
export const NavBar = () => {
	const dispatch = useDispatch();

	const handlerById = (e) => {
		dispatch(orderByRating(e.target.value));
	};

	function handlerOrder(e) {
		dispatch(orderByAsdc(e.target.value));
	}

	function handlerFilter(e) {
		dispatch(filterCards(e.target.value));
	}

	return (
		<div className={style.container}>
			<NavLink to="/home" className={style.nav_link}>
				<div className={style.logo_banner}>
					<div>Code</div>
					<img src={logoImg} className={style.logoImg} />
					<div>Games</div>
				</div>
			</NavLink>

			<div>
				<select
					className={style.select}
					defaultValue="order"
					onChange={handlerOrder}>
					<option value="order">Order by Name</option>
					<option value="A">Name Asc</option>
					<option value="D">Name Desc</option>
					<option value="RA">Rating Asc</option>
					<option value="RD">Rating Desc</option>
				</select>
			</div>
			<input
				className={style.search_gender}
				placeholder="Search by gender..."
			/>
			<div>
				<SearchBar />
			</div>
		</div>
	);
};
