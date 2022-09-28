import React from "react";
import { useNavigate } from "react-router-dom";

export function LogoutButton({currentUserName}) {
	const navigate = useNavigate();

	const handleClick = async () => {
		localStorage.removeItem("user");
		navigate("/login");
	};
	return (
		<button onClick={handleClick} className={"flex content-center justify-content gap-3 "}>
			<p className={ "flex p-0.5"}>
				{currentUserName}
			</p>
			 | Logout
		</button>
	);
}
