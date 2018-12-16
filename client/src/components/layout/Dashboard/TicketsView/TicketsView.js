import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';

export default class TicketsView extends Component {
	componentDidMount() {
		this.props.fetchTickets();
		this.props.fetchUsers();
		this.props.fetchProjects();
	}

	render() {
		const { tickets } = this.props.ticket;

		// const { auth } = this.props;
		return (
			<div>
				<Card.Group className="tickets-grid-container">
					{tickets &&
						tickets.map((ticket, i) => (
							<a key={i} href={`/tickets/${ticket._id}`}>
								<Card>
									<Card.Content>
										<Image floated="right" size="mini" src={ticket.assignee.avatar} />
										<Card.Header>{ticket.title}</Card.Header>
										<Card.Meta>
											{ticket.subProject ? (
												ticket.project.name + ' / ' + ticket.subProject.name
											) : (
												ticket.project.name
											)}
										</Card.Meta>
										<Card.Description>{'Ticket Type: ' + ticket.ticketType}</Card.Description>
										<br />
										<Card.Description>{ticket.description}</Card.Description>
									</Card.Content>
									<Card.Content extra>
										<div className="">
											<Card.Meta>{'Component: ' + ticket.component}</Card.Meta>
										</div>
									</Card.Content>
								</Card>
							</a>
						))}
				</Card.Group>
			</div>
		);
	}
}
