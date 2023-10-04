/* eslint-disable */
import {
	LOAD_VGS,
	ADD_VG,
	REMOVE_VG,
	ORDER_BY_ASDC,
	FILTER_BY_GENDER,
	RESET,
	FILTER_BY_SRC,
	ACUMULATION_VGS,
	SET_GENRES,
	ADD_SEARCH,
	LAST_ID_POSTED,
} from "../type/types.js";

export const initialState = {
	videoGames: [],
	allVideoGames: [],
	allCurrentDataPage: [],
	genres: [],
	lastIdPosted: 0,
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
				allCurrentDataPage: payload,
			};
		case ADD_VG:
			console.log(payload);
			return {
				...state,
				allCurrentDataPage: payload,
			};
		case LAST_ID_POSTED:
			return {
				...state,
				lastIdPosted: payload,
			};

		case FILTER_BY_GENDER:
			if (payload === "All") {
				return {
					...state,
					allCurrentDataPage: [...state.allVideoGames],
				};
			}
			const byGenders = state.allCurrentDataPage.filter((videogame) => {
				const hasGenre = videogame.genres.some((g) => g.name === payload);
				return hasGenre;
			});
			return {
				...state,
				allCurrentDataPage: [...byGenders],
			};

		case FILTER_BY_SRC:
			if (payload === "Api") {
				return {
					...state,
					allCurrentDataPage: state.allCurrentDataPage.filter(
						(videogame) => videogame.source_by === payload
					),
				};
			} else if (payload === "DB") {
				return {
					...state,
					allCurrentDataPage: state.allVideoGames.filter((videogame) => {
						return videogame.source_by === payload;
					}),
				};
			}

			return {
				...state,
				allCurrentDataPage: [...state.allVideoGames],
			};

		case RESET:
			return {
				...state,
				allCurrentDataPage: [...state.allVideoGames],
			};

		case ORDER_BY_ASDC:
			let result;
			let copy2 = [...state.allCurrentDataPage];

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
				allCurrentDataPage: [...result],
			};
		case SET_GENRES:
			return {
				...state,
				genres: payload,
			};
		case ADD_SEARCH:
			return {
				...state,
				allCurrentDataPage: [...state.allCurrentDataPage, ...payload],
				allVideoGames: [...state.allCurrentDataPage, ...payload],
			};

		default:
			return {
				...state,
				videoGames: state.videoGames,
				allVideoGames: state.allVideoGames,
				allCurrentDataPage: state.allCurrentDataPage,
			};
	}
};
