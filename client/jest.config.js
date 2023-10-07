export default {
	// Otras configuraciones de Jest...
	moduleNameMapper: {
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
		"\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/src/assets/fileMock.js",
	},
	testEnvironment: "jsdom",
};
