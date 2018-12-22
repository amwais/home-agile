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

export const editTicket = (ticketData, history) => (dispatch) => {
	axios
		.post(`/api/tickets/${ticketData._id}`, ticketData)
		.then((ticket) => axios.get(`/api/tickets/${ticketData._id}`))
		.then((ticket) => {
			dispatch({
				type: 'EDIT_TICKET',
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

export const editTicketStatus = (ticketData) => (dispatch, getState) => {
	const { tickets } = getState().ticket;

	const optimisticUpdatedTickets = tickets.map((ticket) => {
		if (ticket._id === ticketData._id) {
			ticket.status = ticketData.status;
			return ticket;
		} else {
			return ticket;
		}
	});
	dispatch({
		type: 'FETCH_TICKETS',
		payload: optimisticUpdatedTickets
	});
	axios.post(`/api/tickets/${ticketData._id}`, ticketData).catch((err) =>
		dispatch(
			{
				type: 'FETCH_TICKETS',
				payload: tickets
			},
			{
				type: 'GET_ERRORS',
				payload: err.response.data
			}
		)
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

export const fetchTickets = () => (dispatch, getState) => {
	axios
		.get('/api/tickets/')
		.then((tickets) => {
			dispatch({
				type: 'FETCH_TICKETS',
				payload: tickets.data
			});

			const { ticketsView } = getState();
			const populatedCols = ticketsView.columns;

			tickets.data.forEach((ticket) => {
				populatedCols[ticket.status]['ticketIds'].push(ticket._id);
			});

			dispatch({
				type: 'POPULATE_TICKETS',
				payload: populatedCols
			});
		})
		.catch((err) => console.log(err));
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
