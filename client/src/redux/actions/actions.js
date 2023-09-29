import {
	ADD_VG,
	REMOVE_VG,
	ORDER_BY_ASDC,
	FILTER_BY_GENDER,
	RESET,
	FILTER_BY_SRC,
	ORDER_BY_RATING,
	PAGINATION_PAGE,
	ACUMULATION_VGS,
	SET_CURRENT_PAGE_DATA,
} from "../type/types.js";
import axios from "axios";

export const paginationVGS = (state) => {
	return async (dispatch) => {
		try {
			// if (state.length >= 100) {
			// 	return;
			// }
			let allData = [];
			for (let i = 0; i < 3; i++) {
				const endpoint = `http://localhost:3001/videogames?page=${i + 1}`;
				const { data } = await axios.get(endpoint);
				const newData = data.filter(
					(newVideoGame) =>
						!state.some(
							(existingVideoGame) => existingVideoGame.id === newVideoGame.id
						)
				);

				allData = [...allData, ...newData];

				// if (allData.length >= 100) {
				// 	break;
				// }
			}
			const endpoint2 = `http://localhost:3001/videogames/bd/all`;
			const results = await axios.get(endpoint2);
			allData = [...allData, ...results.data];
			// envia solo 100
			// if (allData.length > 0) {
			// 	dispatch({ type: ACUMULATION_VGS, payload: allData.slice(0, 100) });
			// }
			if (allData.length > 0) {
				dispatch({ type: ACUMULATION_VGS, payload: allData });
			}
		} catch (error) {
			// eslint-disable-next-line
			console.log(error);
		}
	};
};
export const loadVGSPagination = (state = [], currentPage) => {
	try {
		return (dispatch) => {
			const startIndex = (currentPage - 1) * 20;
			const endIndex = startIndex + 20;

			const vgstate = state.slice(startIndex, endIndex);

			return dispatch({
				type: SET_CURRENT_PAGE_DATA,
				payload: vgstate,
			});
		};
		// eslint-disable-next-line
	} catch (error) {
		console.log(error);
	}
};

export const addVG = (videogame) => {
	try {
		const endpoint = "http://localhost:3001/videogames";
		return async (dispatch) => {
			const { data } = await axios.post(endpoint, videogame);
			return dispatch({
				type: ADD_VG,
				payload: data,
			});
		};
		// eslint-disable-next-line
	} catch (error) {
		console.log(error);
	}
};

export const removeVG = (id) => {
	try {
		const endpoint = "http://localhost:3001/videogames/" + id;
		return async (dispatch) => {
			const { data } = await axios.delete(endpoint);
			return dispatch({
				type: REMOVE_VG,
				payload: data,
			});
		};
	} catch (error) {
		console.log(error);
	}
};

export const filterVgGender = (gender) => {
	return {
		type: FILTER_BY_GENDER,
		payload: gender,
	};
};

export const filterVgSrc = (src) => {
	return {
		type: FILTER_BY_SRC,
		payload: src,
	};
};

export const orderByAsdc = (order) => {
	return {
		type: ORDER_BY_ASDC,
		payload: order,
	};
};

export const orderByRating = (rating) => {
	return {
		type: ORDER_BY_RATING,
		payload: rating,
	};
};

export const resetVG = () => {
	return {
		type: RESET,
	};
};

export const setCurrentPage = (currentPage) => {
	return { type: PAGINATION_PAGE, payload: currentPage };
};
