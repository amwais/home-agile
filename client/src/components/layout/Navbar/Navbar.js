import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Select } from 'semantic-ui-react';
import { AddButton } from '../../Buttons/AddButton';
import Ticket from '../../Ticket';
import CreateTicketModal from '../../CreateTicketModal';
import CreateProjectModal from '../../CreateProjectModal';
import EditTicketModal from '../../EditTicketModal';
import EditProjectModal from '../../EditProjectModal';

export default class Navbar extends Component {
	onLogOutClick = (e) => {
		e.preventDefault();
		this.props.logoutUser();
	};

	onTicketAddButtonClick = (e) => {
		e.preventDefault();

		this.props.toggleCreateTicket();
	};

	onProjectAddButtonClick = (e) => {
		e.preventDefault();

		this.props.toggleCreateProject();
	};

	handleViewChange = (e, { value }) => {
		this.props.setProjectView(value);
	};

	projectViewOptions = () => {
		const { projects } = this.props.projects;

		const projectOptions = projects
			.map((project, i) => {
				return { key: i, text: project.name, value: project._id };
			})
			.sort((a, b) => (a.text > b.text ? 1 : -1));

		return [ ...projectOptions, { key: 100, text: 'All Projects', value: '0' } ];
	};

	render() {
		const { isAuthenticated, user } = this.props.auth;
		const { isCreateTicketOpen, isEditTicketOpen, isDisplayTicketOpen } = this.props.ticket;
		const { isCreateProjectOpen, isEditProjectOpen } = this.props.projects;

		const authLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<a href="" className="nav-link" onClick={this.onLogOutClick}>
						<img
							className="rounded-circle"
							style={{
								width: '25px',
								marginRight: '5px'
							}}
							src={user.avatar}
							alt={user.name}
							title="Gravatar goes here"
						/>{' '}
						Logout
					</a>
				</li>
			</ul>
		);

		const guestLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/register">
						Sign Up
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/login">
						Login
					</Link>
				</li>
			</ul>
		);

		return (
			<div>
				<nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
					<div className="container">
						<Link className="nav-link" to="/">
							Home Agile
						</Link>
						<button
							className="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#mobile-nav"
						>
							<span className="navbar-toggler-icon" />
						</button>

						<div className="collapse navbar-collapse" id="mobile-nav">
							{isAuthenticated ? (
								<ul className="navbar-nav mr-auto">
									<li className="nav-item">
										<AddButton label="Ticket" onClick={this.onTicketAddButtonClick} />
									</li>
									<li className="nav-item">
										<AddButton label="Project" onClick={this.onProjectAddButtonClick} />
									</li>
									<li className="nav-item">
										<br />
									</li>
									<li className="nav-item">
										<Select
											placeholder="Select Project"
											options={this.projectViewOptions()}
											value={this.props.navbar.project}
											onChange={this.handleViewChange}
										/>
									</li>
								</ul>
							) : (
								undefined
							)}
							{isAuthenticated ? authLinks : guestLinks}
						</div>
					</div>
				</nav>
				{isDisplayTicketOpen && <Ticket />}
				{isCreateTicketOpen && <CreateTicketModal />}
				{isEditTicketOpen && <EditTicketModal />}
				{isCreateProjectOpen && <CreateProjectModal />}
				{isEditProjectOpen && <EditProjectModal />}
			</div>
		);
	}
}

Navbar.propTypes = {
	auth: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired
};
