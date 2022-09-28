import React, {useEffect, useRef, useState} from 'react';
import ChatInput from './ChatInput';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import {receiveMessageRoute, sendMessageRoute} from '../utils/APIRoutes';

export function ChatContainer({currentChat, socket, currentUser}) {
	const [messages, setMessages] = useState([]);
	const scrollRef = useRef();
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const messages = async () => {
			const response = await axios.post(receiveMessageRoute, {
				from: currentUser,
				to: currentChat,
			});
			setMessages(response.data);
			setIsLoading(false);
		}
		messages();
	}, [currentChat]);

	const handleSendMsg = async (msg) => {
		socket.current.emit('send-msg', {
			to: currentChat,
			from: currentUser,
			msg
		});
		await axios.post(sendMessageRoute, {
			from: currentUser,
			to: currentChat,
			message: msg
		});

		const msgs = [...messages];
		msgs.push({fromSelf: true, message: msg});
		setMessages(msgs);
	};

	useEffect(() => {
		if (socket.current) {
			socket.current.on('msg-receive', (msg) => {
				setArrivalMessage({fromSelf: false, message: msg});
			});
		}
	}, [socket]);

	useEffect(() => {
		arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage]);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({behavior: 'smooth'});
	}, [messages]);

	return (
		<>
			<div className={"py-2 px-8 flex flex-col gap-2 overflow-auto text-white h-4/5 w-4/5"}>
				{isLoading ? (<div/>) :
					(
						messages.map((message) => {
							return (
								<div ref={scrollRef} key={uuidv4()}>
									<div
										className={`flex items-center ${
											message.fromSelf ? 'justify-end' : 'justify-start'
										}`}
									>
										<div className={`break-words p-2 rounded-full group ${
											message.fromSelf ? 'bg-violet-500' : 'bg-violet-700 '
										}`}>
											<p>{message.message}</p>
										</div>
									</div>
								</div>
							);
						})
					)}
			</div>
			<ChatInput handleSendMsg={handleSendMsg}/>
		</>
	);
}
