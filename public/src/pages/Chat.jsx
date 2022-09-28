import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {io} from 'socket.io-client';
import {allUsersRoute, host} from '../utils/APIRoutes';
import {Contacts} from '../components/Contacts';
import Welcome from '../components/Welcome';
import {ChatContainer} from '../components/ChatContainer';
import {LogoutButton} from '../components/LogoutButton';

export default function Chat() {
	const socket = useRef();
	const navigate = useNavigate();
	const [contacts, setContacts] = useState([]);
	const [currentUser, setCurrentUser] = useState(undefined);
	const [isLoading, setIsLoading] = useState(true);
	const [currentChat, setCurrentChat] = useState(undefined)

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user === null) {
			navigate('/login');
		} else {
			setCurrentUser(user);
		}
	}, [navigate]);

	useEffect(() => {
		if (currentUser) {
			socket.current = io(host);
			socket.current.emit('add-user', currentUser);
		}
	}, [currentUser, socket]);

	useEffect(() => {
		async function getUsers() {
			const data = await axios.get(allUsersRoute);
			console.log(data);
			setContacts(data.data.users);
			setIsLoading(false);
		}

		getUsers();
	}, [navigate]);

	const handleChatChange = (chat) => {
		setCurrentChat(chat);
	};

	return (
		<div className={'h-screen w-screen flex flex-col justify-center gap-1 items-center bg-gray-800'}>
			{currentUser === undefined ?
				(<></>) : (
					<div className={'flex flex-col content-center gap-8 items-center bg-gray-900 py-12 px-20 h-4/5 w-4/5'}>
						<div
							className={'absolute text-3xl flex flex-row top-0 right-0 bg-sky-500 rounded-full content-center m-2 bg-purple-600 text-white py-4 px-8 border-none font-bold cursor-pointer uppercase hover:bg-violet-900'}>
							<LogoutButton currentUserName={currentUser}/>
						</div>
						<Contacts
							contacts={contacts}
							changeChat={handleChatChange}
						/>
						{(currentChat === undefined || isLoading) ? (
							<Welcome
								currentUser={currentUser}
							/>
						) : (
							<ChatContainer
								currentUser={currentUser}
								currentChat={currentChat}
								socket={socket}
							/>

						)}
					</div>
				)}
		</div>

	)
};
