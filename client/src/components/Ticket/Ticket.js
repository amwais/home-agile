import React, { Component } from 'react';
import { Modal, Button, Image, Header } from 'semantic-ui-react';

export default class Ticket extends Component {
	state = {
		open: this.props.isOpen,
		dimmer: 'blurring',
		ticket: {
			id: null,
			project: {
				name: '',
				id: null
			},
			ticketType: '',
			title: '',
			description: '',
			component: '',
			assignee: '',
			sprint: '',
			priority: null,
			createdBy: null,
			createdAt: null,
			status: null
		}
	};

	componentDidMount() {
		const { ticket } = this.props;
		if (ticket) {
			this.setState({ ticket: this.props.ticket });
		}
	}

	close = () => this.setState({ open: false });

	render() {
		const { open, dimmer, ticket } = this.state;

		return (
			<div>
				<Modal
					style={{
						top: '100px',
						bottom: 'auto',
						//right: 'auto',
						//left: 'auto',
						height: '62%'
					}}
					dimmer={dimmer}
					open={open}
					onClose={() => this.props.toggleDisplayTicket()}
				>
					<Modal.Header>{ticket.title}</Modal.Header>
					<Modal.Content image style={{ backgroundColor: 'rgba(229, 233, 235, 0.4)' }}>
						<Image
							wrapped
							size="medium"
							src={require('../../images/agenda-concept-development-7376.jpg')}
						/>
						<Modal.Description>
							<h5>
								Status:{' '}
								<Button
									basic
									color="red"
									content={ticket.status}
									style={{
										cursor: 'inherit',
										marginBottom: '10px'
									}}
								/>
							</h5>
							<h5>
								Type:{' '}
								<Button
									basic
									color="red"
									content={ticket.ticketType}
									style={{
										cursor: 'inherit',
										marginBottom: '10px'
									}}
								/>
							</h5>

							<div>description: {ticket.description}</div>
							<br />
							<br />
							<p>Created at: {ticket.createdAt}</p>
							<p>Project: {ticket.project.name}</p>
							<p>component: {ticket.component}</p>
							<p>Assignee: {ticket.assignee.name}</p>
							<p>Priority: {ticket.priority}</p>
							<p>Created By: {ticket.createdBy && ticket.createdBy.name}</p>
						</Modal.Description>
					</Modal.Content>
				</Modal>
			</div>
		);
	}
}
