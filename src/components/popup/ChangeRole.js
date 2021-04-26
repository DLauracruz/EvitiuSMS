import React, { useContext, useRef, useEffect, useState } from 'react';

import Popup from 'reactjs-popup';
import { ContactsContext } from '../../context/ContactsContext';
import { useToasts } from 'react-toast-notifications';
import { types } from '../../context/contactsTypes';

import * as R from 'ramda';

export const ChangeRole = ({ trigger, clientIdx }) => {
	const { addToast } = useToasts();
	const { contactsState, dispatch } = useContext(ContactsContext);
	const { contacts, teams } = contactsState;
	const roles = ['personal', 'admin'];
	const [contact, setContact] = useState();

	const ref = useRef();

	useEffect(() => setContact(contacts[clientIdx]));

	const changeRole = (e) => {
		dispatch({
			type: types.changeRole,
			payload: { id: contact._id, role: e.target.value },
		});

		addToast(`Role changed successfully to ${e.target.value}.`, {
			appearance: 'success',
		});
	};

	const changeName = (e) => {
		setContact({ ...contact, name: e.target.value });
		dispatch({
			type: types.changeRole,
			payload: { id: contact._id, name: e.target.value },
		});
	};

	const changePhone = (e) => {
		dispatch({
			type: types.changeRole,
			payload: { id: contact._id, phone: e.target.value },
		});
	};

	const currentTeam = (team) => {
		if (contact?.teams !== undefined) {
			console.log(
				R.find(R.propEq('name', team.name))(contact.teams) !== undefined
					? true
					: false
			);
			return R.find(R.propEq('name', team.name))(contact.teams) !== undefined
				? true
				: false;
		} else {
			return false;
		}
	};

	return (
		<Popup ref={ref} trigger={trigger} modal>
			{(close) => (
				<div className="popup__add-contact">
					<h4>Change Role</h4>
					<div className="popup__change-contact-role">
						<div className="popup__contact-role">
							<div>
								Name: <input onChange={changeName} value={contact?.name} />{' '}
							</div>
							<div>Role: {contact?.role}</div>
							<div>
								Phone: <input onChange={changePhone} value={contact?.phone} />
							</div>

							<select onChange={changeRole} name="role" id="role">
								{roles.map((role) => (
									<option selected={`${role === contact?.role && 'selected'}`}>
										{role}
									</option>
								))}
							</select>

							<div className="teams-role">
								{console.log(teams)}
								{teams.map((team) => (
									<span className={`${currentTeam(team) && 'current-team'}`}>
										{team?.name}
									</span>
								))}
							</div>
						</div>
					</div>

					<div className="popup__actions">
						<button>Confirm</button>
						<button onClick={close}>Close</button>
					</div>
				</div>
			)}
		</Popup>
	);
};
