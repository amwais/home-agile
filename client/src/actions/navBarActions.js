export const setProjectView = (project) => (dispatch) => {
	dispatch({
		type: 'SET_PROJECT',
		payload: project
	});
};
