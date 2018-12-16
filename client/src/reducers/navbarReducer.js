const initialState = {
	view: 'tickets'
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'SET_VIEW':
			return {
				...state,
				view: action.payload
			};
		default:
			return state;
	}
};
