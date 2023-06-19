import React, { useState } from "react";
import axios from "axios";
import "./Navbar.scss";
import logo from "/logo.svg";

interface User {
	name: string;
}

const dummyRequestData = {
	username: "kminchelle",
	password: "0lelplR",
};

const Navbar: React.FC = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const [popupVisible, setPopupVisible] = useState(false);

	const handleLogin = () => {
		axios
			.post("https://dummyjson.com/auth/login", dummyRequestData, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				console.log(res);
				setLoggedIn(true);
				setUser({ name: res.data.username! });
			})
			.catch((error) => {
				console.error("Error: ", error);
			});
	};

	const handleLogout = () => {
		axios
			.post("https://dummyjson.com/auth/logout", dummyRequestData, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then(() => {
				console.log("Logout success!");
			})
			.catch((error) => {
				console.error("Error: ", error);
			})
			.finally(() => {
				setLoggedIn(false);
				setUser(null);
			});
	};

	return (
		<div className="navbar">
			<div className="logo-container">
				<img src={logo} alt="Promethean logo" className="logo" />
			</div>
			<div className="user">
				{user && <h4>{user.name}</h4>}
				<div>
					<button onClick={() => setPopupVisible((visibility) => !visibility)}>
						Toggle
					</button>
					<div className={`popup-menu ${popupVisible ? "shown" : ""}`}>
						{loggedIn ? (
							<button onClick={handleLogout}>Wyloguj</button>
						) : (
							<button onClick={handleLogin}>Zaloguj</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
