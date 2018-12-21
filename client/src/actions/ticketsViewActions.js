export const populateTickets = (tickets) => (dispatch) => {
	dispatch({
		type: 'FETCH_TICKET_IDS',
		payload: tickets
	});
};
