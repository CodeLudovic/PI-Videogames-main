/* eslint-disable */
import { NavLink } from "react-router-dom";
import style from "./Pagination.module.css";

export const Pagination = ({ onPageChange, currentPage, totalPages }) => {
	let pageNumbers = [];

	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}

	return (
		<div className={style.pagination_content}>
			{pageNumbers.map((pageNumber, index) => (
				<button
					key={index}
					onClick={() => onPageChange(pageNumber)}
					className={currentPage === pageNumber ? style.active : style.disable}>
					{pageNumber}
				</button>
			))}
		</div>
	);
};
