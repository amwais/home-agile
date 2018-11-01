import axios from 'axios';

// Register User
export const createTicket = (ticketData, history) => (dispatch) => {
	axios
		.post('/api/tickets/', ticketData)
		.then((ticket) => {
			dispatch({
				type: 'CREATE_TICKET',
				payload: ticket
			});
			dispatch({
				type: 'TOGGLE_CREATE_TICKET'
			});
			// history.push(`/${ticket.id}`);
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
