/* eslint-disable */
import styles from "./Pagination.module.css";
import { useState, useEffect } from "react";

export const Pagination = ({
	input,
	forPage,
	setPage,
	page,
	maximum,
	setInput,
}) => {
	const [isHidden, setIsHidden] = useState(false);

	useEffect(() => {
		let prevScrollPos = window.scrollY;

		const handleScroll = () => {
			const currentScrollPos = window.scrollY;

			if (prevScrollPos > currentScrollPos) {
				// El usuario está haciendo scroll hacia arriba, muestra la barra
				setIsHidden(false);
			} else {
				// El usuario está haciendo scroll hacia abajo, oculta la barra
				setIsHidden(true);
			}

			prevScrollPos = scrollY;
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			// Limpia el listener de scroll en la desmontura del componente
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
	const nextPage = () => {
		if (page === maximum) return;

		setInput(parseInt(input) + 1);
		setPage(parseInt(page) + 1);
	};

	const previousPage = () => {
		if (page === 1) return;

		setInput(parseInt(input) - 1);
		setPage(parseInt(page) - 1);
	};

	const onKeyDown = (e) => {
		if (e.keyCode == 13) {
			setPage(parseInt(input));
			if (
				parseInt(input < 1) ||
				parseInt(input) > Math.ceil(maximum) ||
				isNaN(parseInt(input))
			) {
				setPage(1);
				setInput(1);
			} else {
				setPage(parseInt(input));
			}
		}
	};

	const onChange = () => {
		setInput(input);
	};

	return (
		<div className={styles.pagination_content}>
			<button
				className={styles.button_pag_prev}
				disabled={page === 1 || page < 1}
				onClick={previousPage}>
				<svg
					width="22"
					height="25"
					viewBox="0 0 15 27"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					transform="scale(0.9)">
					<path
						d="M19.2853 26.5151C19.0696 26.6273 18.8274 26.6786 18.5848 26.6636C18.3421 26.6485 18.1081 26.5677 17.9079 26.4297L0.574034 14.4294C0.396911 14.3066 0.252166 14.1428 0.152193 13.9519C0.0522204 13.7611 0 13.5488 0 13.3333C0 13.1178 0.0522204 12.9056 0.152193 12.7147C0.252166 12.5238 0.396911 12.36 0.574034 12.2373L17.9079 0.236891C18.108 0.0984771 18.3421 0.0174242 18.5849 0.0025091C18.8277 -0.012406 19.0699 0.039385 19.2854 0.152274C19.5009 0.265163 19.6814 0.434849 19.8073 0.642958C19.9333 0.851067 19.9999 1.08967 20 1.33293V25.3337C20 25.5771 19.9335 25.8159 19.8075 26.0241C19.6815 26.2324 19.5009 26.4021 19.2853 26.5151Z"
						fill="white"
					/>
				</svg>
			</button>
			<div className={styles.center_pag}>
				<input
					className={styles.input_pag}
					onChange={() => onChange()}
					onKeyDown={() => onKeyDown()}
					name="page"
					autoComplete="off"
					value={maximum === 0 ? 0 : input}
				/>
				<p> de {maximum} </p>
			</div>
			<button
				className={styles.button_pag_next}
				disabled={page === Math.ceil(maximum) || page > Math.ceil(maximum)}
				onClick={nextPage}>
				<svg
					width="22"
					height="25"
					viewBox="0 0 15 27"
					fill="none"
					transform="scale(0.9)"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M0.71469 26.5151C0.930384 26.6273 1.17256 26.6786 1.41522 26.6636C1.65788 26.6485 1.89187 26.5677 2.09207 26.4297L19.426 14.4294C19.6031 14.3066 19.7478 14.1428 19.8478 13.9519C19.9478 13.7611 20 13.5488 20 13.3333C20 13.1178 19.9478 12.9056 19.8478 12.7147C19.7478 12.5238 19.6031 12.36 19.426 12.2373L2.09207 0.236891C1.89203 0.0984771 1.65793 0.0174242 1.41513 0.0025091C1.17233 -0.012406 0.930075 0.039385 0.714596 0.152274C0.499118 0.265163 0.318628 0.434849 0.192669 0.642958C0.06671 0.851067 8.21138e-05 1.08967 1.81114e-08 1.33293V25.3337C-4.00911e-05 25.5771 0.0665396 25.8159 0.192523 26.0241C0.318506 26.2324 0.499086 26.4021 0.71469 26.5151Z"
						fill="white"
					/>
				</svg>
			</button>
		</div>
	);
};
