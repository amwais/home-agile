import React, { Component } from 'react';
import { Button, Modal, Form, Message } from 'semantic-ui-react';
import { ticketTypes, priorities } from '../../constants';

const options = [ { key: 'm', text: 'Male', value: 'male' }, { key: 'f', text: 'Female', value: 'female' } ];

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
			projectError: false,
			ticketTypeError: false,
			titleError: false,
			assigneeError: false
		}
	};

	onChange = (e, { name, value }) => {
		this.setState({
			ticket: {
				...this.state.ticket,
				[name]: value
			}
		});
	};

	onSubmit = (e, ticketData) => {
		e.preventDefault();
		const { project, assignee, title, ticketType } = ticketData;

		const errorState = {
			projectError: !project,
			ticketTypeError: !ticketType,
			titleError: !title,
			assigneeError: !assignee
		};

		this.setState({
			errors: {
				...errorState
			}
		});

		const { projectError, assigneeError, titleError, ticketTypeError } = errorState;

		if (projectError || assigneeError || titleError || ticketTypeError) {
			return;
		} else {
			this.props.createTicket(ticketData, this.props.history);
			this.props.toggleCreateTicket(this.props.ticket);
		}
	};

	render() {
		const { ticket, dimmer, errors } = this.state;

		return (
			<div>
				<Modal
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
									error={errors.projectError}
								/>
								<Form.Select
									onChange={this.onChange}
									name="ticketType"
									fluid
									label="Ticket Type"
									options={ticketTypes}
									placeholder="Ticket Type"
									value={ticket.ticketType}
									error={errors.ticketTypeError}
								/>
							</Form.Group>
							<Form.Input
								onChange={this.onChange}
								name="title"
								fluid
								label="Title"
								placeholder="Short description of the task"
								value={ticket.title}
								error={errors.titleError}
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
									options={this.props.users.map((user) => {
										return { text: user.name, value: user._id };
									})}
									value={ticket.assignee}
									error={errors.assigneeError}
								/>
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
							{(errors.projectError ||
								errors.ticketTypeError ||
								errors.titleError ||
								errors.assigneeError) && (
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
