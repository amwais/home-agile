import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, Icon, Popup, Label, Menu, Button } from 'semantic-ui-react';
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

	onProjectEditButtonClick = (e, project) => {
		e.preventDefault();
		this.props.toggleEditProject(project);
	};

	handleViewChange = (e, { value }) => {
		this.props.setProjectView(value);
		this.props.fetchProject(value);
	};

	projectViewOptions = () => {
		const { projects } = this.props.projects;

		const projectOptions = projects
			.map((project, i) => {
				return { key: i, text: project.name, value: project._id };
			})
			.sort((a, b) => (a.text > b.text ? 1 : -1));

		return projectOptions;
		// return [ ...projectOptions, { key: 100, text: 'All Projects', value: '0' } ];
	};

	render() {
		const { isAuthenticated, user } = this.props.auth;
		const { isCreateTicketOpen, isEditTicketOpen, isDisplayTicketOpen } = this.props.ticket;
		const { isCreateProjectOpen, isEditProjectOpen } = this.props.projects;
		const { project } = this.props.navbar;

		const authLinks = (
			<div style={{ marginTop: 'auto', marginBottom: 'auto', left: '200px', position: 'relative' }}>
				<Popup
					trigger={
						<img
							className="rounded-circle"
							style={{
								width: '25px'
							}}
							src={user.avatar}
							alt={user.name}
						/>
					}
					size="small"
					content={user.name}
					position="bottom center"
				/>

				<Label as="a" onClick={this.onLogOutClick} color="red" ribbon="right">
					Logout
				</Label>
			</div>
		);

		const guestLinks = (
			<Button.Group
				style={{
					marginTop: 'auto',
					marginBottom: 'auto',
					left: '500px',
					position: 'relative'
				}}
			>
				<Button as="a" href="/login" positive>
					Login
				</Button>
				<Button.Or />
				<Button as="a" href="/register" color="blue">
					Sign Up
				</Button>
			</Button.Group>
		);

		const projectViewOptions = this.projectViewOptions();

		return (
			<div
				style={{
					marginBottom: '25px'
				}}
			>
				<Menu
					style={{
						display: 'flex',
						justifyContent: isAuthenticated ? 'space-around' : 'space-between',
						backgroundColor: '#010814'
					}}
				>
					<Menu.Item style={isAuthenticated ? { right: '50px', position: 'relative' } : {}}>
						<Label
							style={{ color: 'white' }}
							as="a"
							href="/dashboard"
							color="blue"
							ribbon={isAuthenticated}
						>
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
									options={projectViewOptions}
									value={projectViewOptions[0] && projectViewOptions[0].value}
									onChange={this.handleViewChange}
								/>
							</Menu.Item>
							{project !== '0' && (
								<Menu.Item style={{ marginLeft: '10px' }}>
									<Popup
										trigger={
											<Icon
												name="pencil"
												link
												color="blue"
												inverted
												size="large"
												onClick={(e) => this.onProjectEditButtonClick(e, project)}
											/>
										}
										size="small"
										content="Edit this project"
										position="bottom center"
									/>
								</Menu.Item>
							)}
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
