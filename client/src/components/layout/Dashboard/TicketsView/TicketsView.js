import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';

export default class TicketsView extends Component {
	componentDidMount() {
		this.props.fetchTickets();
	}

	render() {
		const { tickets } = this.props.ticket;
		return (
			<div>
				<Card.Group className="tickets-grid-container">
					{tickets &&
						tickets.map((ticket, i) => (
							<a key={i} href={`/tickets/${ticket._id}`}>
								<Card>
									<Card.Content>
										<Image floated="right" size="mini" src={this.props.auth.user.avatar} />
										<Card.Header>{ticket.title}</Card.Header>
										<Card.Meta>{ticket.project}</Card.Meta>
										<Card.Description>
											Steve wants to add you to the group <strong>best friends</strong>
										</Card.Description>
									</Card.Content>
									<Card.Content extra>
										<div className="ui two buttons">
											<Button basic color="green">
												Approve
											</Button>
											<Button basic color="red">
												Decline
											</Button>
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
