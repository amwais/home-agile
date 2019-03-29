import React, { Component } from 'react';
import { Button, Modal, Form, Message } from 'semantic-ui-react';
import { ticketTypes, priorities } from '../../constants';

export default class CreateTicketModal extends Component {
	state = {
		open: true,
		dimmer: 'blurring',
		ticket: {
			project: null,
			ticketType: null,
			title: '',
			description: '',
			assignee: null,
			priority: null,
			createdBy: null,
			createdAt: null
		},
		errors: {
			project: false,
			ticketType: false,
			title: false,
			assignee: false,
			priority: false
		}
	};

	onChange = (e, { name, value }) => {
		if ([ name ] && this.state.errors[[ name ]]) {
			this.setState({
				errors: {
					...this.state.errors,
					[name]: false
				}
			});
		}

		this.setState({
			ticket: {
				...this.state.ticket,
				[name]: value
			}
		});
	};

	onSubmit = (e, ticketData) => {
		e.preventDefault();
		const { project, assignee, title, ticketType, priority } = ticketData;

		const errorState = {
			project: !project,
			ticketType: !ticketType,
			title: !title,
			assignee: !assignee,
			priority: !priority
		};

		this.setState({
			errors: {
				...errorState
			}
		});

		if (errorState.project || errorState.assignee || errorState.title || errorState.title || errorState.priority) {
			return;
		} else {
			this.props.createTicket(ticketData);
			this.props.toggleCreateTicket(this.props.ticket);
		}
	};

	getProjectMembersOptions = () => {
		if (this.state.ticket.project) {
			const ticketProject = this.props.projects.find((project) => project._id === this.state.ticket.project);
			const { users } = this.props;
			const memberIds = ticketProject.members.map((member) => member._id);

			const filteredUsers = users.filter((user) => memberIds.includes(user._id));

			console.log(filteredUsers);

			const options = filteredUsers.map((user) => {
				return { text: user.name, value: user._id };
			});

			return options;
		}
		return [ { key: 0, text: 'Please select a project', value: '0' } ];
	};

	render() {
		const { ticket, dimmer, errors } = this.state;

		return (
			<div>
				<Modal
					style={{
						height: '70%',
						marginTop: '5%'
					}}
					dimmer={dimmer}
					open={this.props.isOpen}
					onClose={() => this.props.toggleCreateTicket(this.props.ticket)}
				>
					<Modal.Header>Create a new ticket</Modal.Header>
					<Modal.Content>
						<Form error>
							<Form.Group widths="equal">
								<Form.Select
									onChange={this.onChange}
									name="project"
									fluid
									label="Project"
									options={this.props.projects.map((project) => {
										return { text: project.name, value: project._id };
									})}
									placeholder="Project"
									value={ticket.project}
									error={errors.project}
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
									options={this.getProjectMembersOptions()}
									value={ticket.assignee}
									error={errors.assignee}
								/>
								<Form.Select
									onChange={this.onChange}
									name="priority"
									fluid
									label="Priority"
									placeholder="Priority"
									options={priorities}
									value={ticket.priority}
									error={errors.priority}
								/>
							</Form.Group>
							{(errors.project || errors.ticketType || errors.title || errors.assignee) && (
								<Message
									error
									header="Missing Fields"
									content="Please complete all the required fields."
								/>
							)}
						</Form>
					</Modal.Content>
					<Modal.Actions>
						<Button negative onClick={() => this.props.toggleCreateTicket()}>
							Cancel
						</Button>
						<Button
							positive
							icon="checkmark"
							labelPosition="right"
							content="Add Ticket"
							onClick={(e) => this.onSubmit(e, this.state.ticket)}
						/>
					</Modal.Actions>
				</Modal>
			</div>
		);
	}
}
