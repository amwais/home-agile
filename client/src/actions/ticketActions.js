import axios from 'axios';

export const createTicket = (ticketData, history) => (dispatch) => {
	axios
		.post('/api/tickets/', ticketData)
		.then((ticket) => {
			dispatch({
				type: 'CREATE_TICKET',
				payload: ticket.data
			});
			history.push(`/tickets/${ticket.data._id}`);
		})
		.catch((err) =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			})
		);
};

export const fetchTicket = (ticketId) => (dispatch) => {
	axios
		.get(`/api/tickets/${ticketId}`)
		.then((ticket) => {
			dispatch({
				type: 'FETCH_TICKET_DETAILS',
				payload: ticket.data
			});
		})
		.catch((err) =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			})
		);
};

export const fetchTickets = () => (dispatch) => {
	axios
		.get('/api/tickets/')
		.then((tickets) => {
			dispatch({
				type: 'FETCH_TICKETS',
				payload: tickets.data
			});
		})
		.catch((err) =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			})
		);
};

// Open create ticket modal
export const toggleCreateTicket = () => (dispatch) => {
	dispatch({
		type: 'TOGGLE_CREATE_TICKET'
	});
};

// Open create ticket modal
export const toggleEditTicket = (ticket) => (dispatch) => {
	dispatch({
		type: 'TOGGLE_EDIT_TICKET',
		payload: ticket
	});
};

export const clearTicket = () => (dispatch) => {
	dispatch({
		type: 'CLEAR_TICKET'
	});
};
