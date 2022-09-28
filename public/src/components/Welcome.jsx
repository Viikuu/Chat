import React from "react";

export default function Welcome({currentUser}) {
	return (
		<div className={"flex content-center items-center text-white flex-col"}>
			<h1>
				Welcome {currentUser.username}
			</h1>
			<h3>Please select a chat to Start messaging.</h3>
		</div>
	);
};
