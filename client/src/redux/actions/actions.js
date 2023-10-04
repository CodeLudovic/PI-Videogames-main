import {
	ADD_VG,
	REMOVE_VG,
	ORDER_BY_ASDC,
	FILTER_BY_GENDER,
	RESET,
	FILTER_BY_SRC,
	ORDER_BY_RATING,
	SET_GENRES,
	ACUMULATION_VGS,
	ADD_SEARCH,
	LAST_ID_POSTED,
	// LOAD_DETAIL
} from "../type/types.js";
import axios from "axios";

// export const loadDetail = (state = [], id) => {
// 	try {
// 		return (dispatch) => {
// 			// const startIndex = (currentPage - 1) * 20;
// 			// const endIndex = startIndex + 20;

// 			const filteredDetails = state.filter((detail) => detail.id === id);

// 			return dispatch({
// 				type: SET_CURRENT_PAGE_DATA,
// 				payload: filteredDetails,
// 			});
// 		};
// 		// eslint-disable-next-line
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

export const paginationVGS = () => {
	return async (dispatch) => {
		try {
			const endpoint = `http://localhost:3001/videogames`;
			const { data } = await axios.get(endpoint);

			if (data.length > 0) {
				dispatch({ type: ACUMULATION_VGS, payload: data });
			}
		} catch (error) {
			// eslint-disable-next-line
			console.log(error);
		}
	};
};
// export const loadVGSPagination = (state = [], currentPage) => {
// 	try {
// 		return (dispatch) => {
// 			const startIndex = (currentPage - 1) * 20;
// 			const endIndex = startIndex + 20;

// 			const vgstate = state.slice(startIndex, endIndex);

// 			return dispatch({
// 				type: SET_CURRENT_PAGE_DATA,
// 				payload: vgstate,
// 			});
// 		};
// 		// eslint-disable-next-line
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

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

export const addSearch = (name) => {
	try {
		const endpoint = `http://localhost:3001/videogames/name?search=${name}`;
		return async (dispatch) => {
			const { data } = await axios(endpoint);
			console.log(data.results);
			return dispatch({
				type: ADD_SEARCH,
				payload: data.results,
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

export const lastIdPosted = (id) => {
	return {
		type: LAST_ID_POSTED,
		payload: id,
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

export const setAllGenres = () => {
	try {
		const endpoint = "http://localhost:3001/genres";
		return async (dispatch) => {
			const { data } = await axios.get(endpoint);
			return dispatch({
				type: SET_GENRES,
				payload: data.response,
			});
		};
		// eslint-disable-next-line
	} catch (error) {
		console.log(error);
	}
};
