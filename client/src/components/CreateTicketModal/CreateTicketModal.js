import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import { ticketTypes, priorities } from '../../constants';

const options = [ { key: 'm', text: 'Male', value: 'male' }, { key: 'f', text: 'Female', value: 'female' } ];

export default class CreateTicketModal extends Component {
	state = {
		open: true,
		dimmer: 'blurring',
		ticket: {
			id: null,
			project: '',
			ticketType: '',
			title: '',
			description: '',
			component: '',
			assignee: '',
			sprint: null,
			priority: null,
			createdBy: null,
			createdAt: null
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
		this.props.createTicket(ticketData, this.props.history);
		this.props.toggleCreateTicket(this.props.ticket);
	};

	render() {
		const { ticket, dimmer } = this.state;

		return (
			<div>
				<Modal
					dimmer={dimmer}
					open={this.props.isOpen}
					onClose={() => this.props.toggleCreateTicket(this.props.ticket)}
				>
					<Modal.Header>Create a new ticket</Modal.Header>
					<Modal.Content>
						<Form>
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
								/>
								<Form.Select
									onChange={this.onChange}
									name="ticketType"
									fluid
									label="Ticket Type"
									options={ticketTypes}
									placeholder="Ticket Type"
									value={ticket.ticketType}
								/>
							</Form.Group>
							<Form.Input
								onChange={this.onChange}
								name="title"
								fluid
								label="Title"
								placeholder="Short description of the task"
								value={ticket.title}
							/>
							<Form.TextArea
								onChange={this.onChange}
								name="description"
								label="Ticket Description"
								placeholder="Ticket Description"
								value={ticket.description}
							/>
							<Form.Group widths="equal">
								<Form.Input
									onChange={this.onChange}
									name="component"
									fluid
									label="Component"
									placeholder="Type to search..."
									value={ticket.component}
								/>
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
								<Form.Select
									onChange={this.onChange}
									name="sprint"
									fluid
									label="Sprint"
									placeholder="Sprint"
									options={options}
									disabled
									value={ticket.sprint}
								/>
							</Form.Group>
							<Form.Checkbox label="Place in backlog (No sprint)" defaultChecked />
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
