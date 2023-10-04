si este es mi reducer y 

export const initialState = {
	videoGames: [],
	allVideoGames: [],
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
				allCurrentDataPage: payload,
			};
		case ADD_VG:
			return {
				...state,
				allCurrentDataPage: payload,
			};
		case REMOVE_VG:
			return {
				...state,
				videoGames: payload,
				allVideoGames: payload,
				allCurrentDataPage: payload,
			};

		case FILTER_BY_GENDER:
			return {
				...state,
				allCurrentDataPage: state.allCurrentDataPage.filter(
					(videogame) => videogame.gender === payload
				),
			};

		case FILTER_BY_SRC:
			return {
				...state,
				videoGames: state.allCurrentDataPage.filter(
					(videogame) => videogame.source_by === payload
				),
			};

		case RESET:
			return {
				...state,
				videoGames: [...state.allVideoGames],
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

		default:
			return {
				...state,
				videoGames: state.videoGames,
				allVideoGames: state.allVideoGames,
				allCurrentDataPage: state.allCurrentDataPage,
			};
	}
};

y me piden hacer esto "Botones/Opciones para filtrar por género, y por si su origen es de la API o de la base de datos (creados por nosotros desde el formulario)"

teniendo en cuenta que los juegos tienen de a 3 generos o muchas veces 1 o 2 porque criterio harias el filtro, es decir, ordenar por algun genero en especifico?