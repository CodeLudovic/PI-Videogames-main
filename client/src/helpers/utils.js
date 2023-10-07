import axios from "axios";

export const maxID = (state) => {
	let mxID = 0;
	for (const item of state) {
		if (item.id > mxID) mxID = item.id;
	}
	console.log(mxID);
	return mxID + 1;
};

export const genresHelper = async () => {
	const genres = await axios("http://localhost:3001/genres");
	return genres.data;
};
