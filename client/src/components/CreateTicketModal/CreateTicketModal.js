import React, { Component } from 'react';
import { Button, Header, Modal, Form } from 'semantic-ui-react';

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
			createdBy: null,
			createdAt: null
		}
	};

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
		this.props.createTicket(ticketData);
	};

	render() {
		const { dimmer } = this.state;

		return (
			<div>
				<Modal dimmer={dimmer} open={this.props.isOpen} onClose={this.props.toggleCreateTicket}>
					<Modal.Header>Create a new Ticket</Modal.Header>
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
								/>
								<Form.Input
									onChange={this.onChange}
									name="subProject"
									fluid
									label="Sub-Project"
									options={options}
									placeholder="Sub-Project"
								/>
								<Form.Select
									onChange={this.onChange}
									name="ticketType"
									fluid
									label="Ticket Type"
									options={options}
									placeholder="Ticket Type"
								/>
							</Form.Group>
							<Form.Input
								onChange={this.onChange}
								name="title"
								fluid
								label="Title"
								placeholder="Short description of the task"
							/>
							<Form.TextArea
								onChange={this.onChange}
								name="description"
								label="Ticket Description"
								placeholder="Ticket Description"
							/>
							<Form.Group widths="equal">
								<Form.Input
									onChange={this.onChange}
									name="component"
									fluid
									label="Component"
									placeholder="Type to search..."
								/>
								<Form.Select
									onChange={this.onChange}
									name="assignee"
									fluid
									label="Assignee"
									placeholder="Assignee"
									options={options}
								/>
							</Form.Group>
							<Form.Group widths="equal">
								<Form.Select
									onChange={this.onChange}
									name="sprint"
									fluid
									label="Sprint"
									placeholder="Sprint"
									options={options}
									disabled
								/>
							</Form.Group>
							<Form.Checkbox label="Place in backlog (No sprint)" defaultChecked />
						</Form>
					</Modal.Content>
					<Modal.Actions>
						<Button negative onClick={this.props.toggleCreateTicket}>
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
