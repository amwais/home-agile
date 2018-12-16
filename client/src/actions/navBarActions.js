export const setView = (view) => (dispatch) => {
	dispatch({
		type: 'SET_VIEW',
		payload: view
	});
};
