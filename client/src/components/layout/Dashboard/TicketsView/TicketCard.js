import React, { Component } from 'react';
import { Card, Image, Button, Label, Icon } from 'semantic-ui-react';
import { Draggable } from 'react-beautiful-dnd';

class TicketCard extends Component {
	render() {
		const { ticket, index, toggleEditTicket, toggleDisplayTicket } = this.props;
		return (
			<Draggable draggableId={ticket._id} index={index}>
				{(provided, snapshot) => (
					<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
						<Card
							style={{
								margin: '0 auto'
							}}
						>
							<Card.Content>
								<div style={{ display: 'flex', justifyContent: 'space-between' }}>
									<Button
										basic
										color="red"
										content={ticket.ticketType}
										style={{
											cursor: 'inherit'
										}}
										size="mini"
									/>
									{ticket.priority && (
										<Label as="a" color="red">
											{ticket.priority}
										</Label>
									)}
									<Button
										onClick={() => toggleEditTicket(ticket)}
										animated="vertical"
										/*style={{
											marginRight: '10px',
											position: 'absolute',
											right: '0'
										}}*/
										size="mini"
									>
										<Button.Content hidden>Edit</Button.Content>
										<Button.Content visible>
											<Icon name="edit" />
										</Button.Content>
									</Button>
								</div>

								<br />
								<br />
								<Image floated="right" size="mini" src={ticket.assignee.avatar} />

								<Card.Header style={{ marginBottom: '8px' }}>
									<a
										onClick={() => {
											toggleDisplayTicket(ticket);
										}}
										// eslint-disable-next-line
										href="javascript:void(0)"
										style={{
											color: 'green'
										}}
									>
										{ticket.title}
									</a>
								</Card.Header>
								<Card.Meta>{ticket.project.name}</Card.Meta>
								<Card.Description>{ticket.description}</Card.Description>
							</Card.Content>
						</Card>
					</div>
				)}
			</Draggable>
		);
	}
}

export default TicketCard;
