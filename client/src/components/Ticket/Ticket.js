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

		// const { name, _id } = ticket.project;

		return (
			<div>
				<Modal dimmer={dimmer} open={open} onClose={() => this.props.toggleDisplayTicket()}>
					<Modal.Header>{ticket.title}</Modal.Header>
					<Modal.Content image>
						<Image
							wrapped
							size="medium"
							src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
						/>
						<Modal.Description>
							<Header>Status: {ticket.status}</Header>
							<Button
								basic
								color="red"
								content={ticket.ticketType}
								style={{
									cursor: 'inherit'
								}}
							/>
						</Modal.Description>
					</Modal.Content>
				</Modal>
			</div>
		);
	}
}
