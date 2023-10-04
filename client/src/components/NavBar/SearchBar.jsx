/* eslint-disable */
import { useState } from "react";
import style from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { addSearch } from "../../redux/actions/actions";

export const SearchBar = () => {
	let [name, setName] = useState("");
	const dispatch = useDispatch();

	function handleChange(event) {
		setName(event.target.value);
	}

	const handlerSearch = (e) => {
		if (!name || name === "") {
			window.alert("Please, write a name to start searching");
			return;
		}
		dispatch(addSearch(name));
		console.log(name);
	};

	return (
		<div className={style.container}>
			<div className={style.button_box}>
				<input
					placeholder="Search by name..."
					className={style.input_nav}
					type="search"
					id="inp"
					onInput={handleChange}
				/>
			</div>
			<div className={style.button_box}>
				<button className={style.button_search} onClick={handlerSearch}>
					Buscar
				</button>
			</div>
		</div>
	);
};
