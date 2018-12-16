import React, { Component } from 'react';
import { Container, Header, Divider, Image, Segment, Icon, Button } from 'semantic-ui-react';

export default class Ticket extends Component {
	componentDidMount() {
		console.log(this.props.match);

		const { id } = this.props.match.params;
		this.props.fetchTicket(id);
	}

	render() {
		const { ticket } = this.props.ticket;
		console.log(ticket);

		return (
			<div>
				<Container>
					<Button onClick={() => this.props.toggleEditTicket(ticket)} animated="vertical">
						<Button.Content hidden>Edit</Button.Content>
						<Button.Content visible>
							<Icon name="edit" />
						</Button.Content>
					</Button>
				</Container>

				<Container className="ticket">
					{ticket && (
						<div>
							<Header className="ticket-header" as="h2">
								{ticket.title}
							</Header>
							<Divider />
							<Segment raised>
								<p>
									<strong>Description:</strong> {ticket.description}
								</p>
							</Segment>
							<Segment raised>
								{ticket.subProject ? (
									<p>
										<strong>Project:</strong> {ticket.project.name}
										<br />
										<br />
										<strong>Sub-Project:</strong> {ticket.subProject.name}
									</p>
								) : (
									<p>
										<strong>Project:</strong> {ticket.project.name}
									</p>
								)}
							</Segment>
							<Segment raised>
								<strong>Created at: </strong>
								{ticket.createdAt}
								<br />
								<br />
								<strong>Type: </strong>
								{ticket.ticketType}
								<br />
								<br />
								<strong>Component: </strong>
								{ticket.component}
								<br />
								<br />
								<strong>Priority: </strong>
								{ticket.priority}
							</Segment>
							<Segment raised>
								<strong>Assignee: </strong>
								{ticket.assignee.name}
								<br />
								<br />
								<strong>Created by: </strong>
								{ticket.createdBy && <Image size="mini" src={ticket.createdBy.avatar} />}
								{ticket.createdBy && ticket.createdBy.name}
							</Segment>
						</div>
					)}
				</Container>
			</div>
		);
	}
}
