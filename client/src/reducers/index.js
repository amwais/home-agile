import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import ticketReducer from './ticketReducer';
import usersReducer from './usersReducer';
import projectsReducer from './projectsReducer';
import navbarReducer from './navbarReducer';
import ticketsViewReducer from './ticketsViewReducer';

export default combineReducers({
	auth: authReducer,
	ticket: ticketReducer,
	errors: errorReducer,
	users: usersReducer,
	projects: projectsReducer,
	navbar: navbarReducer,
	ticketsView: ticketsViewReducer
});
