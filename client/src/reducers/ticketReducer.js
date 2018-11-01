const initialState = {
	ticket: null,
	tickets: null,
	isLoading: false,
	isOpen: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'CREATE_TICKET':
			return {
				...state,
				ticket: action.payload
			};
		case 'FETCH_TICKETS':
			return {
				...state,
				tickets: action.payload
			};
		case 'TOGGLE_CREATE_TICKET':
			return {
				...state,
				isOpen: !state.isOpen
			};
		default:
			return state;
	}
};
