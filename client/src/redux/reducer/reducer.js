/* eslint-disable */
import {
	LOAD_VGS,
	ADD_VG,
	REMOVE_VG,
	ORDER_BY_ASDC,
	FILTER_BY_GENDER,
	RESET,
	FILTER_BY_SRC,
	PAGINATION_PAGE,
	ACUMULATION_VGS,
	SET_CURRENT_PAGE_DATA,
} from "../type/types.js";

export const initialState = {
	videoGames: [],
	allVideoGames: [],
	currentPage: 1,
	currentDataPage: [],
	allCurrentDataPage: [],
};
/* eslint-disable */
export const rootReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ACUMULATION_VGS:
			return {
				...state,
				videoGames: payload,
				allVideoGames: payload,
				allCurrentDataPage: payload,
			};
		case LOAD_VGS:
			return {
				...state,
				videoGames: payload,
				allVideoGames: payload,
			};
		case ADD_VG:
			return {
				...state,
				videoGames: payload,
				allVideoGames: payload,
			};
		case REMOVE_VG:
			return {
				...state,
				videoGames: payload,
				allVideoGames: payload,
			};

		case FILTER_BY_GENDER:
			return {
				...state,
				currentDataPage: state.currentDataPage.filter(
					(videogame) => videogame.gender === payload
				),
			};

		case FILTER_BY_SRC:
			return {
				...state,
				videoGames: state.allVideoGames.filter(
					(videogame) => videogame.gender === payload
				),
			};

		case RESET:
			return {
				...state,
				videoGames: [...state.allVideoGames],
			};

		case ORDER_BY_ASDC:
			let result;
			let copy2 = [...state.currentDataPage];

			if (payload === "A") {
				result = copy2.sort((a, b) => a.name.localeCompare(b.name));
			}

			if (payload === "D") {
				result = copy2.sort((a, b) => b.name.localeCompare(a.name));
			}

			if (payload === "RA") {
				result = copy2.sort((a, b) => a.rating - b.rating);
			}

			if (payload === "RD") {
				result = copy2.sort((a, b) => b.rating - a.rating);
			}

			return {
				...state,
				currentDataPage: [...result],
			};
		case PAGINATION_PAGE:
			return { ...state, currentPage: payload };

		case SET_CURRENT_PAGE_DATA:
			return {
				...state,
				currentDataPage: payload,
			};
		default:
			return {
				...state,
				videoGames: state.videoGames,
				videoGames: state.allVideoGames,
				currentPage: state.currentPage,
				currentDataPage: state.currentDataPage,
				allCurrentDataPage: state.allCurrentDataPage,
			};
	}
};
