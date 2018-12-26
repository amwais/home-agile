import React, { Component, PureComponent } from 'react';
import StatusColumn from './StatusColumn';
import { DragDropContext } from 'react-beautiful-dnd';

class InnerList extends PureComponent {
	render() {
		const { column, tickets, index, toggleEditTicket, toggleDisplayTicket } = this.props;

		return (
			<StatusColumn
				column={column}
				tickets={tickets}
				index={index}
				toggleEditTicket={toggleEditTicket}
				toggleDisplayTicket={toggleDisplayTicket}
			/>
		);
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

	onDragEnd = (result) => {
		const { ticket } = this.props.ticket;

		if (!result.destination) {
			return;
		}
		const updatedTicket = ticket;

		updatedTicket.status = result.destination.droppableId;

		this.props.editTicketStatus(updatedTicket);

		this.props.clearTicket();
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
				<DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
					{ticketsView.colIds.map((colId, index) => {
						const column = ticketsView.columns[colId];
						const colTickets = tickets.filter((ticket) => ticket.status === column.id);

						return (
							<InnerList
								key={column.id}
								column={column}
								index={index}
								tickets={colTickets}
								toggleEditTicket={this.props.toggleEditTicket}
								toggleDisplayTicket={this.props.toggleDisplayTicket}
							/>
						);
					})}
				</DragDropContext>
			</div>
		);
	}
}
