import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Select, Label, Menu } from 'semantic-ui-react';
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
			<div style={{ marginTop: 'auto', marginBottom: 'auto', left: '200px', position: 'relative' }}>
				<img
					className="rounded-circle"
					style={{
						width: '25px'
					}}
					src={user.avatar}
					alt={user.name}
					title="Gravatar goes here"
				/>
				<Label as="a" onClick={this.onLogOutClick} color="red" ribbon="right">
					Logout
				</Label>
			</div>
		);

		const guestLinks = (
			<ul className="">
				<li className="">
					<Link className="" to="/register">
						Sign Up
					</Link>
				</li>
				<li className="">
					<Link className="" to="/login">
						Login
					</Link>
				</li>
			</ul>
		);

		return (
			<div
				style={{
					marginBottom: '25px'
				}}
			>
				<Menu
					style={{
						display: 'flex',
						justifyContent: 'space-around',
						backgroundColor: '#010814'
					}}
				>
					<Menu.Item style={{ right: '50px', position: 'relative' }}>
						<Label style={{ color: 'white' }} as="a" href="/dashboard" color="blue" ribbon>
							Home Agile
						</Label>
					</Menu.Item>

					{isAuthenticated ? (
						<span
							style={{
								display: 'flex'
							}}
						>
							<Menu.Item>
								<AddButton label="Ticket" onClick={this.onTicketAddButtonClick} />
							</Menu.Item>
							<Menu.Item>
								<AddButton label="Project" onClick={this.onProjectAddButtonClick} />
							</Menu.Item>
							<Menu.Item>
								<Select
									placeholder="Select Project"
									options={this.projectViewOptions()}
									value={this.props.navbar.project}
									onChange={this.handleViewChange}
								/>
							</Menu.Item>
						</span>
					) : (
						undefined
					)}
					{isAuthenticated ? authLinks : guestLinks}
				</Menu>
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
