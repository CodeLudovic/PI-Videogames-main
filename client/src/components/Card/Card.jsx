/* eslint-disable*/
import { NavLink } from "react-router-dom";
import style from "./Card.module.css";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
export const Card = ({ item }) => {
	return (
		<>
			<NavLink to={`/videogames/detail/${item.id}`} className={style.nav_link}>
				<div className={style.card}>
					<div className={style.stars}>
						{[...new Array(5)].map((star, index) => {
							return index < Math.ceil(Number(item.rating)) ? (
								<AiFillStar key={index} />
							) : (
								<AiOutlineStar key={index} />
							);
						})}
					</div>
					{item.source_by === "Api" ? (
						<>
							<div>
								<img src={item.background_image} className={style.image_card} />
							</div>

							<div className={style.text_name}>{item.name}</div>

							<div
								className={style.genre}
								style={{ gridTemplateRows: "1fr 1fr 1fr" }}>
								{item.genres?.map((genre) => (
									<div>&nbsp;{genre.name}</div>
								))}
							</div>
						</>
					) : (
						<>
							<div>
								<img src={item.image} className={style.image_card} />
							</div>

							<div className={style.text_name}>{item.name}</div>

							<div
								className={style.genre}
								style={{ gridTemplateRows: "1fr 1fr 1fr" }}>
								{item.genres?.map((genre) => (
									<div>&nbsp;{genre.name}</div>
								))}
							</div>
						</>
					)}
				</div>
			</NavLink>
		</>
	);
};
