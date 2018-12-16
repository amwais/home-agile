import axios from 'axios';

// export const createTicket = (ticketData, history) => (dispatch) => {
// 	axios
// 		.post('/api/tickets/', ticketData)
// 		.then((ticket) => {
// 			dispatch({
// 				type: 'CREATE_TICKET',
// 				payload: ticket.data
// 			});
// 			history.push(`/tickets/${ticket.data._id}`);
// 		})
// 		.catch((err) =>
// 			dispatch({
// 				type: 'GET_ERRORS',
// 				payload: err.response.data
// 			})
// 		);
// };

// export const fetchTicket = (ticketId) => (dispatch) => {
// 	axios
// 		.get(`/api/tickets/${ticketId}`)
// 		.then((ticket) => {
// 			dispatch({
// 				type: 'FETCH_TICKET_DETAILS',
// 				payload: ticket.data
// 			});
// 		})
// 		.catch((err) =>
// 			dispatch({
// 				type: 'GET_ERRORS',
// 				payload: err.response.data
// 			})
// 		);
// };

export const fetchProjects = () => (dispatch) => {
	axios
		.get('/api/projects/')
		.then((projects) => {
			dispatch({
				type: 'FETCH_PROJECTS',
				payload: projects.data
			});
		})
		.catch((err) =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			})
		);
};

// Open create project modal
export const toggleCreateProject = () => (dispatch) => {
	dispatch({
		type: 'TOGGLE_CREATE_PROJECT'
	});
};

// // Open create ticket modal
// export const toggleEditTicket = (ticket) => (dispatch) => {
// 	dispatch({
// 		type: 'TOGGLE_EDIT_TICKET',
// 		payload: ticket
// 	});
// };

// export const clearTicket = () => (dispatch) => {
// 	dispatch({
// 		type: 'CLEAR_TICKET'
// 	});
// };
