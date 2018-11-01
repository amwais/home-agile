import React, { Component } from 'react';
import { Container, Header, Divider, Segment } from 'semantic-ui-react';

export default class Ticket extends Component {
	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.fetchTicket(id);
	}

	render() {
		const { ticket } = this.props.ticket;
		return (
			<div>
				<Container text textAlign="center">
					<Header as="h2">Ticket Details</Header>
					<Divider />
					{ticket && (
						<div>
							<Segment raised>{ticket.title}</Segment>
							<Segment raised>{ticket.description}</Segment>
							<Segment raised>{ticket.createdAt}</Segment>
							<Segment raised>{ticket.project}</Segment>
							<Segment raised>{ticket.subProject}</Segment>
							<Segment raised>{ticket.subProject}</Segment>
							<Segment raised>{ticket.ticketType}</Segment>
							<Segment raised>{ticket.component}</Segment>
							<Segment raised>{ticket.assignee}</Segment>
							<Segment raised>{ticket.assignee}</Segment>
							<Segment raised>{ticket.sprint}</Segment>
							<Segment raised>{ticket.createdBy}</Segment>
							<Segment raised>{ticket.priority}</Segment>
						</div>
					)}
				</Container>
			</div>
		);
	}
}
