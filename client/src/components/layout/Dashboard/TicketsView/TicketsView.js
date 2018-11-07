import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';

export default class TicketsView extends Component {
	componentDidMount() {
		this.props.fetchTickets();
	}

	render() {
		const { tickets } = this.props.ticket;
		const { auth } = this.props;
		return (
			<div>
				<Card.Group className="tickets-grid-container">
					{tickets &&
						tickets.map((ticket, i) => (
							<a key={i} href={`/tickets/${ticket._id}`}>
								<Card>
									<Card.Content>
										<Image floated="right" size="mini" src={auth.user.avatar} />
										<Card.Header>{ticket.title}</Card.Header>
										<Card.Meta>
											{ticket.subProject ? (
												ticket.project + ' / ' + ticket.subProject
											) : (
												ticket.project
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
