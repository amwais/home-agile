const initialState = {
	project: '0'
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'SET_PROJECT':
			return {
				...state,
				project: action.payload
			};
		default:
			return state;
	}
};
