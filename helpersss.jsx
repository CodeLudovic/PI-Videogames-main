export const paginationVGSComplete = async (state) => {
	try {
		let allData = [];
		for (let i = 0; i < 5; i++) {
			const endpoint = `http://localhost:3001/videogames?page=${i + 1}`;
			const { data } = await axios.get(endpoint);
			allData += data.filter(
				(newVideoGame) =>
					!state.some(
						(existingVideoGame) => existingVideoGame.id === newVideoGame.id
					)
			);
		}
		return {
			type: ACUMULATION_VGS,
			payload: allData,
		};

		// eslint-disable-next-line
	} catch (error) {
		console.log(error);
	}
};

export const paginationVGS = (page = 1, state) => {
	try {
		const endpoint = `http://localhost:3001/videogames?page=${page}`;
		return async (dispatch) => {
			const { data } = await axios.get(endpoint);
			let newData = data.filter(
				(newVideoGame) =>
					!state.some(
						(existingVideoGame) => existingVideoGame.id === newVideoGame.id
					)
			);
			return dispatch({
				type: ACUMULATION_VGS,
				payload: newData,
			});
		};
		// eslint-disable-next-line
	} catch (error) {
		console.log(error);
	}
};
