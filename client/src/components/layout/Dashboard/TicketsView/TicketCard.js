import React from 'react';
import { Card, Image, List } from 'semantic-ui-react';

const TicketCard = (props) => {
	const { ticket } = props;

	return (
		<List.Item>
			<List.Content>
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
							{ticket.subProject ? (
								ticket.project.name + ' / ' + ticket.subProject.name
							) : (
								ticket.project.name
							)}
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
			</List.Content>
		</List.Item>
	);
};

export default TicketCard;
