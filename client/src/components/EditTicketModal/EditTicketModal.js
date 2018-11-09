import React, { Component } from 'react';
import { Button, Modal, Form, Dropdown } from 'semantic-ui-react';
import { ticketTypes, priorities } from '../../constants';

const options = [ { key: 'm', text: 'Male', value: 'male' }, { key: 'f', text: 'Female', value: 'female' } ];

export default class EditTicketModal extends Component {
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
			sprint: '',
			priority: null,
			createdBy: null,
			createdAt: null
		}
	};

	componentDidMount() {
		const { ticket } = this.props;

		if (ticket) {
			this.setState({ ticket: this.props.ticket });
		}

		this.props.fetchUsers();
	}

	onChange = (e, { name, value }) => {
		if (name === 'assignee') {
			const assignee = this.props.users.filter((user) => user._id === value)[0];

			this.setState({
				ticket: {
					...this.state.ticket,
					assignee: {
						_id: assignee._id,
						name: assignee.name,
						avatar: assignee.avatar
					}
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
		this.props.createTicket(ticketData, this.props.history);
		this.props.toggleEditTicket(this.props.ticket);
	};

	render() {
		const { ticket, dimmer } = this.state;
		const userOptions = this.props.users.map((user) => {
			return { text: user.name, value: user._id };
		});

		return (
			<div>
				<Modal
					dimmer={dimmer}
					open={this.props.isOpen}
					onClose={() => this.props.toggleEditTicket(this.props.ticket)}
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
									options={userOptions}
									value={ticket.assignee.name}
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
						<Button negative onClick={() => this.props.toggleEditTicket(this.props.ticket)}>
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
