/* eslint-disable */
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import style from "./App.module.css";
import style2 from "./views/Home/Home.module.css";
import { LandingPage } from "./views/LandingPage/LandingPage";
import { Home } from "./views/Home/Home";
import { Detail } from "./views/Detail/Detail";
import { Cards } from "./components/Cards/Cards";
import { NavBar } from "./components/NavBar/NavBar";

function App() {
	return (
		<div className={style.App}>
			<Routes>
				<Route
					path="/"
					element={
						<>
							<LandingPage />
						</>
					}
				/>
				<Route
					path="/home"
					element={
						<>
							<Home />
						</>
					}
				/>
				<Route
					path="videogames/detail/:id"
					element={
						<>
							<Detail />
						</>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
