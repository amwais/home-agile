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
			assignee: false
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
		const { project, assignee, title, ticketType } = ticketData;

		const errorState = {
			project: !project,
			ticketType: !ticketType,
			title: !title,
			assignee: !assignee
		};

		this.setState({
			errors: {
				...errorState
			}
		});

		if (errorState.project || errorState.assignee || errorState.title || errorState.title) {
			return;
		} else {
			this.props.createTicket(ticketData);
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
									options={this.props.users.map((user) => {
										return { text: user.name, value: user._id };
									})}
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
