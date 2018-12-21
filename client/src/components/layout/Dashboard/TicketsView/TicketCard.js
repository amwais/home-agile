import React, { Component } from 'react';
import { Card, Image, List } from 'semantic-ui-react';
import { Draggable } from 'react-beautiful-dnd';

export default class TicketCard extends Component {
	render() {
		const { ticket, index } = this.props;
		return (
			<Card>
				<Card.Content>
					<Image floated="right" size="mini" src={ticket.assignee.avatar} />

					<Card.Header style={{ marginBottom: '8px' }}>
						<a
							href={`/tickets/${ticket._id}`}
							style={{
								color: 'green'
							}}
						>
							{ticket.title}
						</a>
					</Card.Header>
					<Card.Meta>
						{ticket.subProject ? ticket.project.name + ' / ' + ticket.subProject.name : ticket.project.name}
					</Card.Meta>
					<Card.Description>{'Ticket Type: ' + ticket.ticketType}</Card.Description>
					<Card.Meta>{'Component: ' + ticket.component}</Card.Meta>
					<br />
					<Card.Description>{ticket.description}</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<div className="">
						<Card.Meta>{'Status: ' + ticket.status}</Card.Meta>
					</div>
				</Card.Content>
			</Card>
		);
	}
}
