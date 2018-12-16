const initialState = {
	ticket: null,
	tickets: null,
	isLoading: false,
	isCreateTicketOpen: false,
	isEditTicketOpen: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'CREATE_TICKET':
			return {
				...state,
				ticket: action.payload
			};
		case 'EDIT_TICKET':
			return {
				...state,
				ticket: action.payload
			};
		case 'FETCH_TICKETS':
			return {
				...state,
				tickets: action.payload
			};
		case 'FETCH_TICKET_DETAILS':
			return {
				...state,
				ticket: action.payload
			};
		case 'CLEAR_TICKET':
			return {
				...state,
				ticket: null
			};
		case 'TOGGLE_CREATE_TICKET':
			return {
				...state,
				isCreateTicketOpen: !state.isCreateTicketOpen
			};
		case 'TOGGLE_EDIT_TICKET':
			return {
				...state,
				isEditTicketOpen: !state.isEditTicketOpen,
				ticket: action.payload
			};
		default:
			return state;
	}
};
