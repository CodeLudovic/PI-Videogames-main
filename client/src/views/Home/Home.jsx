/* eslint-disable */
import { useEffect, useState } from "react";
import style from "./Home.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import img1 from "../../assets/wp2605458-gaming-wallpapers-1920x1080.jpg";
import img2 from "../../assets/alexander.jpg";
import img3 from "../../assets/wp2614866-wallpaper-hd-games.jpg";
import img4 from "../../assets/wp2617679-wallpaper-hd-games.jpg";
import img6 from "../../assets/wp2717518-ps4-video-game-wallpaper-hd-1080p.jpg";
import img7 from "../../assets/wp2724959-hd-wallpapers-1920x1080-games.jpg";
import img8 from "../../assets/wp2724987-hd-wallpapers-1920x1080-games.jpg";
import img9 from "../../assets/wp2928790-full-hd-games-wallpaper.jpg";
import img10 from "../../assets/wp2936648-full-hd-game-wallpaper-1920x1080.jpg";
import img11 from "../../assets/wp2936675-full-hd-game-wallpaper-1920x1080.jpg";
import img12 from "../../assets/wp2936682-full-hd-game-wallpaper-1920x1080.jpg";
import img13 from "../../assets/wp2936684-full-hd-game-wallpaper-1920x1080.jpg";
import { NavBar } from "../../components/NavBar/NavBar";
import { Cards } from "../../components/Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import { loadVGSPagination, setCurrentPage } from "../../redux/actions/actions";
import { Pagination } from "../../components/Pagination/Pagination";

export const Home = () => {
	const [backgroundImage, setBackgroundImage] = useState("");
	const vg = useSelector((state) => state.videoGames);
	const videoGms = useSelector((state) => state.currentDataPage);
	const vg2 = useSelector((state) => state.allCurrentDataPage);
	const currentPage = useSelector((state) => state.currentPage);
	const nav = useNavigate();
	let totalPages = 5;
	//console.log(vg);
	// console.log(videoGms);
	// console.log(vg2);
	const backgrounds = [
		img1,
		img2,
		img3,
		img4,
		img6,
		img7,
		img8,
		img9,
		img10,
		img11,
		img12,
		img13,
	];

	if (videoGms.length === 0 || vg2.length === 0) {
		nav("/");
	}

	useEffect(() => {
		const selectRandomPic = () => {
			const randomIndex = Math.floor(Math.random() * backgrounds.length);
			return backgrounds[randomIndex];
		};

		setBackgroundImage(selectRandomPic());
	}, []);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadVGSPagination(vg, currentPage));
	}, []);

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
		dispatch(loadVGSPagination(vg2, newPage));
		dispatch(setCurrentPage(newPage));
	};

	return (
		<>
			<div className={style.container}>
				<div
					className={style.alexander}
					style={{
						backgroundImage: `url(${backgroundImage})`,
					}}></div>

				<div className={style.navbar}>
					<NavBar />
				</div>
				<Pagination
					currentPage={currentPage}
					onPageChange={handlePageChange}
					totalPages={totalPages}
				/>
				<Cards videogames={videoGms} />
			</div>
		</>
	);
};
