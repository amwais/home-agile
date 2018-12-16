const initialState = {
	project: null,
	projects: null,
	isLoading: false,
	isCreateProjectOpen: false,
	isEditProjectOpen: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		// case 'CREATE_TICKET':
		// 	return {
		// 		...state,
		// 		ticket: action.payload
		// 	};
		case 'FETCH_PROJECTS':
			return {
				...state,
				projects: action.payload
			};
		// case 'FETCH_TICKET_DETAILS':
		// 	return {
		// 		...state,
		// 		ticket: action.payload
		// 	};
		// case 'CLEAR_TICKET':
		// 	return {
		// 		...state,
		// 		ticket: null
		// 	};
		case 'TOGGLE_CREATE_PROJECT':
			return {
				...state,
				isCreateProjectOpen: !state.isCreateProjectOpen
			};
		// case 'TOGGLE_EDIT_TICKET':
		// 	return {
		// 		...state,
		// 		isEditOpen: !state.isEditOpen,
		// 		ticket: action.payload
		// 	};
		default:
			return state;
	}
};
