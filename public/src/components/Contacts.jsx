import React from 'react';
import {Select} from './Select';


export function Contacts({contacts, changeChat}) {
	const changeCurrentChat = async (value) => {
		function getSelected(value) {
			for (const option of value.target) {
				if (option.selected) {
					return option.value;
				}
			}
		}
		changeChat(getSelected(value));
	};

	return (
		<>
			<Select onChange={changeCurrentChat} options={contacts}/>
		</>
	);
}
