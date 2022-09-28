import React, { useState } from "react";

export default function ChatInput({ handleSendMsg }) {
	const [msg, setMsg] = useState("");

	const sendChat = (event) => {
		event.preventDefault();
		if (msg.length > 0) {
			handleSendMsg(msg);
			setMsg("");
		}
	};

	return (
		<div className={"bg-gray-900 py-8"}>
			<form className={"w-full rounded-full  flex items-center gap-2 bg-gray-600"} onSubmit={(event) => sendChat(event)}>
				<input
					className={"w-10/12 h-3/5 bg-transparent text-white border-none text-xl pl-2 selection:bg-violet-500 focus:outline-none"}
					type="text"
					placeholder="type your message here"
					onChange={(e) => setMsg(e.target.value)}
					value={msg}
				/>
				<button type="submit" className={"px-1 py-4 rounded-full text-white flex items-center bg-violet-500 hover:bg-violet-700 border-none justify-center"}>
					Submit
				</button>
			</form>
		</div>
	);
}
