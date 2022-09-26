import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {io} from "socket.io-client";
import {allUsersRoute, host} from '../utils/APIRoutes';
import {Contacts} from '../components/Contacts';
import Welcome from '../components/Welcome';
import {ChatContainer} from '../components/ChatContainer';

export default function Chat() {
	const socket = useRef();
	const navigate = useNavigate();
	const [contacts, setContacts] = useState([]);
	const [currentUser, setCurrentUser] = useState(undefined);
	const [isLoading, setIsLoading] = useState(true);
	const [currentChat, setCurrentChat] = useState(undefined)

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('chat-app-user'));
		if (user === null) {
			navigate('/login');
		} else {
			setCurrentUser(user);
		}
	}, [navigate]);

	useEffect(() => {
		if(currentUser) {
			socket.current = io(host);
			socket.current.emit("add-user", currentUser._id);
		}
	}, [currentUser,socket]);

	useEffect(() => {
		async function getUsers() {
			const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
			setContacts(data.data.users);
			setIsLoading(false);
		}

		if (currentUser) {
			if (currentUser.isAvatarColorSet) {
				getUsers();
			} else {
				navigate('/setAvatar');
			}
		}
	}, [currentUser, navigate]);

	const handleChatChange = (chat) => {
		setCurrentChat(chat);
	};

	return (
		<>
			<>
				{currentUser === undefined || !currentUser.isAvatarColorSet ?
					(<></>) : (
						<div className={'container'}>
							<Contacts
								contacts={contacts}
								currentUser={currentUser}
								changeChat={handleChatChange}
							/>
							{(currentChat === undefined || isLoading) ? (
								<Welcome
									currentUser={currentUser}
								/>
							) : (
								currentChat ? (
									<div></div>
								):
									(
										<ChatContainer
											currentUser={currentUser}
											currentChat={currentChat}
											socket ={socket}
										/>
									)

							)}
						</div>
					)}
			</>
		</>
	)
};
