/* eslint-disable */
import { useState } from "react";
import style from "./SearchBar.module.css";

export const SearchBar = () => {
	let [name, setName] = useState("");

	function handleChange(event) {
		setName(event.target.value);
	}
	return (
		<div className={style.container}>
			<div className={style.button_box}>
				<input
					placeholder="Search by name..."
					className={style.input_nav}
					type="search"
					id="inp"
					onChange={handleChange}
				/>
			</div>
			<div className={style.button_box}>
				<button className={style.button_search}>Buscar</button>
			</div>
		</div>
	);
};
