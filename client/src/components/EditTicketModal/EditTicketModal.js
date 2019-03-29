import React, { Component } from 'react';
import { Button, Modal, Form, Message } from 'semantic-ui-react';
import { ticketTypes, priorities } from '../../constants';

export default class EditTicketModal extends Component {
	state = {
		open: this.props.isOpen,
		// dimmer: 'blurring',
		ticket: {
			id: null,
			project: '',
			ticketType: '',
			title: '',
			description: '',
			assignee: '',
			priority: null,
			createdBy: null,
			createdAt: null,
			status: null
		},
		errors: {
			title: false
		}
	};

	componentDidMount() {
		const { ticket } = this.props;

		if (ticket) {
			this.setState({ ticket: this.props.ticket });
		}
		this.props.fetchProjects();
		this.props.fetchUsers();
	}

	onChange = (e, { name, value }) => {
		if ([ name ] && this.state.errors[[ name ]]) {
			this.setState({
				errors: {
					...this.state.errors,
					[name]: false
				}
			});
		}
		if (name === 'assignee') {
			const user = this.props.users.filter((user) => user._id === value)[0];
			const { _id, name, avatar } = user;
			const populatedUser = {
				_id,
				name,
				avatar
			};
			this.setState({
				ticket: {
					...this.state.ticket,
					assignee: populatedUser
				}
			});
		} else if (name === 'project') {
			const project = this.props.projects.filter((project) => project._id === value)[0];
			const { _id, name } = project;
			const populatedProject = {
				_id,
				name
			};
			this.setState({
				ticket: {
					...this.state.ticket,
					project: populatedProject
				}
			});
		} else {
			this.setState({
				ticket: {
					...this.state.ticket,
					[name]: value
				}
			});
		}
	};

	onSubmit = (e, ticketData) => {
		e.preventDefault();
		const { title } = ticketData;
		const errorState = {
			title: !title
		};

		this.setState({
			errors: {
				...errorState
			}
		});
		if (errorState.project || errorState.assignee || errorState.title || errorState.title || errorState.priority) {
			return;
		} else {
			this.props.editTicket(ticketData, this.props.history);
			this.props.toggleEditTicket(this.props.ticket);
		}
	};

	render() {
		const { ticket, dimmer, open, errors } = this.state;
		const { columns } = this.props.ticketsView;

		const userOptions = this.props.users.map((user) => {
			return { text: user.name, value: user._id };
		});

		const statusOptions = Object.keys(columns).map((column) => {
			const val = columns[column];

			return { text: val.title, value: val.id };
		});

		return (
			<div>
				<Modal dimmer={dimmer} open={open} onClose={() => this.props.toggleEditTicket(this.props.ticket)}>
					<Modal.Header>Edit Ticket</Modal.Header>
					<Modal.Content>
						<Form>
							<Form.Group widths="equal">
								<Form.Select
									onChange={this.onChange}
									name="project"
									fluid
									label="Project"
									value={ticket.project._id}
									error={errors.project}
									options={
										this.props.projects ? (
											this.props.projects.map((project, i) => {
												return { key: i, text: project.name, value: project._id };
											})
										) : (
											[]
										)
									}
								/>
								<Form.Select
									onChange={this.onChange}
									name="ticketType"
									fluid
									label="Ticket Type"
									options={ticketTypes}
									placeholder="Ticket Type"
									value={ticket.ticketType}
									error={errors.ticketType}
								/>
							</Form.Group>
							<Form.Input
								onChange={this.onChange}
								name="title"
								fluid
								label="Title"
								placeholder="Short description of the task"
								value={ticket.title}
								error={errors.title}
							/>
							<Form.TextArea
								onChange={this.onChange}
								name="description"
								label="Ticket Description"
								placeholder="Ticket Description"
								value={ticket.description}
							/>
							<Form.Group widths="equal">
								<Form.Select
									onChange={this.onChange}
									name="assignee"
									fluid
									label="Assignee"
									placeholder="Assignee"
									options={userOptions}
									value={ticket.assignee._id}
									error={errors.assignee}
								/>
								<Form.Select
									onChange={this.onChange}
									name="status"
									fluid
									label="Status"
									placeholder="Status"
									options={statusOptions}
									value={ticket.status}
								/>
							</Form.Group>
							<Form.Group widths="equal">
								<Form.Select
									onChange={this.onChange}
									name="priority"
									fluid
									label="Priority"
									placeholder="Priority"
									options={priorities}
									value={ticket.priority}
								/>
							</Form.Group>
						</Form>
						{errors.title && (
							<Message error header="Missing Fields" content="Please complete all the required fields." />
						)}
					</Modal.Content>
					<Modal.Actions>
						<Button negative onClick={() => this.props.toggleEditTicket(this.props.ticket)}>
							Cancel
						</Button>
						<Button
							positive
							icon="checkmark"
							labelPosition="right"
							content="Confirm"
							onClick={(e) => this.onSubmit(e, this.state.ticket)}
						/>
					</Modal.Actions>
				</Modal>
			</div>
		);
	}
}
