import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Ticket from './components/Ticket';
import Project from './components/Project';
import Dashboard from './components/layout/Dashboard';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { Provider } from 'react-redux';
import store from './store';
import { DragDropContext } from 'react-beautiful-dnd';

import './App.css';

const handleAuth = () => {
	// Check for token
	if (localStorage.jwtToken) {
		// Set auth token header auth
		setAuthToken(localStorage.jwtToken);

		// Decode token and get user info and expiration
		const decoded = jwt_decode(localStorage.jwtToken);

		// Set user and isAuthenticated
		store.dispatch(setCurrentUser(decoded));

		// Check for expired token
		const currentTime = Date.now() / 1000;

		if (decoded.exp < currentTime) {
			// Logout user
			store.dispatch(logoutUser());

			// Redirect to login
			window.location.href = '/login';
		}
	}
};

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			store.getState().auth.isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />}
	/>
);

handleAuth();

class App extends Component {
	onBeforeDragStart = () => {
		/*...*/
	};

	onDragStart = () => {
		/*...*/
	};
	onDragUpdate = () => {
		/*...*/
	};
	onDragEnd = () => {
		// the only one that is required
	};

	render() {
		return (
			<Provider store={store}>
				<Router>
					<DragDropContext
						onBeforeDragStart={this.onBeforeDragStart}
						onDragStart={this.onDragStart}
						onDragUpdate={this.onDragUpdate}
						onDragEnd={this.onDragEnd}
					>
						<div className="App">
							<Navbar />
							<Route exact path="/" component={Landing} />
							<div>
								<Route exact path="/register" component={Register} />
								<Route exact path="/login" component={Login} />
								<PrivateRoute exact path="/dashboard" component={Dashboard} />
								<PrivateRoute path="/tickets/:id" component={Ticket} />
								<PrivateRoute path="/projects/:id" component={Project} />
							</div>
						</div>
					</DragDropContext>
				</Router>
			</Provider>
		);
	}
}

export default App;
