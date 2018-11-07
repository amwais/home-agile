import axios from 'axios';

export const fetchUsers = () => (dispatch) => {
	axios
		.get('/api/users/')
		.then((users) => {
			dispatch({
				type: 'FETCH_USERS',
				payload: users.data
			});
		})
		.catch((err) =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			})
		);
};
