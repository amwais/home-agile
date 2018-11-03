import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

const options = [ { key: 'm', text: 'Male', value: 'male' }, { key: 'f', text: 'Female', value: 'female' } ];

export default class CreateTicketModal extends Component {
	state = {
		open: this.props.isOpen,
		// dimmer: 'blurring',
		ticket: {
			id: null,
			project: '',
			subProject: '',
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

	componentDidMount() {
		const { ticket } = this.props;
		if (ticket.title) {
			this.setState({ ticket: this.props.ticket });
		}
	}

	close = () => this.setState({ open: false });

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
	};

	render() {
		const { ticket, dimmer } = this.state;

		return (
			<div>
				<Modal dimmer={dimmer} open={this.props.isOpen} onClose={() => this.props.toggleCreateTicket(ticket)}>
					<Modal.Header>Create a new ticket</Modal.Header>
					<Modal.Content>
						<Form>
							<Form.Group widths="equal">
								<Form.Select
									onChange={this.onChange}
									name="project"
									fluid
									label="Project"
									options={options}
									placeholder="Project"
									value={ticket.project}
								/>
								<Form.Input
									onChange={this.onChange}
									name="subProject"
									fluid
									label="Sub-Project"
									options={options}
									placeholder="Sub-Project"
									value={ticket.subProject}
								/>
								<Form.Select
									onChange={this.onChange}
									name="ticketType"
									fluid
									label="Ticket Type"
									options={options}
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
									options={options}
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
									options={options}
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
						<Button negative onClick={() => this.props.toggleCreateTicket(ticket)}>
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
