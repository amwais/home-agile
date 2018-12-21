import axios from 'axios';

export const createProject = (projectData, history) => (dispatch) => {
	axios
		.post('/api/projects/', projectData)
		.then((project) => {
			dispatch({
				type: 'CREATE_PROJECT',
				payload: project.data
			});
			history.push(`/projects/${project.data._id}`);
		})
		.catch((err) =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			})
		);
};

export const fetchProject = (projectId) => (dispatch) => {
	axios
		.get(`/api/projects/${projectId}`)
		.then((project) => {
			dispatch({
				type: 'FETCH_PROJECT_DETAILS',
				payload: project.data
			});
		})
		.catch((err) =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			})
		);
};

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

// Open create project modal
export const toggleEditProject = (project) => (dispatch) => {
	dispatch({
		type: 'TOGGLE_EDIT_PROJECT',
		payload: project
	});
};

export const editProject = (projectData, history) => (dispatch) => {
	axios
		.post(`/api/projects/${projectData._id}`, projectData)
		.then((project) => axios.get(`/api/projects/${projectData._id}`))
		.then((project) => {
			dispatch({
				type: 'EDIT_PROJECT',
				payload: project.data
			});
			history.push(`/projects/${project.data._id}`);
		})
		.catch((err) =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			})
		);
};

// export const clearTicket = () => (dispatch) => {
// 	dispatch({
// 		type: 'CLEAR_TICKET'
// 	});
// };
