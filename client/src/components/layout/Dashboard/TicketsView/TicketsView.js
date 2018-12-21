import React, { Component, PureComponent } from 'react';
import StatusColumn from './StatusColumn';
import { DragDropContext } from 'react-beautiful-dnd';

class InnerList extends PureComponent {
	render() {
		const { column, tickets, index } = this.props;

		return <StatusColumn column={column} tickets={tickets} index={index} />;
	}
}

export default class TicketsView extends Component {
	componentDidMount() {
		this.props.fetchTickets();
		this.props.fetchUsers();
		this.props.fetchProjects();
	}

	onDragStart = (start) => {
		this.props.fetchTicket(start.draggableId);
	};

	onDragUpdate = (update) => {};

	onDragEnd = (result) => {
		const { ticket } = this.props.ticket;

		if (!result.destination) {
			return;
		}
		const updatedTicket = ticket;

		updatedTicket['status'] = result.destination.droppableId;

		this.props.editTicketStatus(updatedTicket);
		this.props.fetchTickets();
	};

	render() {
		const { tickets } = this.props.ticket;
		const { ticketsView } = this.props;

		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-evenly'
				}}
			>
				<DragDropContext
					onBeforeDragStart={this.onBeforeDragStart}
					onDragStart={this.onDragStart}
					onDragUpdate={this.onDragUpdate}
					onDragEnd={this.onDragEnd}
				>
					{ticketsView.colIds.map((colId, index) => {
						const column = ticketsView.columns[colId];

						const colTickets = tickets.filter((ticket) => ticket.status === column.id);

						return <InnerList key={column.id} column={column} index={index} tickets={colTickets} />;
					})}
				</DragDropContext>
			</div>
		);
	}
}
