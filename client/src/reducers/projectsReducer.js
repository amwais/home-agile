const initialState = {
	project: null,
	projects: null,
	isLoading: false,
	isCreateProjectOpen: false,
	isEditProjectOpen: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'CREATE_PROJECT':
			return {
				...state,
				project: action.payload
			};
		case 'EDIT_PROJECT':
			return {
				...state,
				project: action.payload
			};
		case 'FETCH_PROJECTS':
			return {
				...state,
				projects: action.payload
			};
		case 'FETCH_PROJECT_DETAILS':
			return {
				...state,
				project: action.payload
			};
		case 'CLEAR_PROJECT':
			return {
				...state,
				project: null
			};
		case 'TOGGLE_CREATE_PROJECT':
			return {
				...state,
				isCreateProjectOpen: !state.isCreateProjectOpen
			};
		case 'TOGGLE_EDIT_PROJECT':
			return {
				...state,
				isEditProjectOpen: !state.isEditProjectOpen,
				project: action.payload
			};
		default:
			return state;
	}
};
