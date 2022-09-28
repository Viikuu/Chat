const host = "https://user-chat-vikku.herokuapp.com";
const loginRoute = `${host}/api/auth/login`;
const allUsersRoute = `${host}/api/auth/allusers`;
const sendMessageRoute = `${host}/api/messages/`;
const receiveMessageRoute = `${host}/api/messages/all`;
export {
	host,
	loginRoute,
	allUsersRoute,
	sendMessageRoute,
	receiveMessageRoute,
};
