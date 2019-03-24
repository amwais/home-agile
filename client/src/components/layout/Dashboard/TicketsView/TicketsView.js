import React, { Component, PureComponent } from 'react';
import StatusColumn from './StatusColumn';
import { DragDropContext } from 'react-beautiful-dnd';
import { Dimmer, Loader } from 'semantic-ui-react';

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
				<Dimmer active={ticketsView.loading}>
					<Loader size="large">Loading</Loader>
				</Dimmer>
				<DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
					{ticketsView.colIds.map((colId, index) => {
						const column = ticketsView.columns[colId];
						const { project } = this.props.navbar;

						const colTickets =
							project === '0'
								? tickets.filter((ticket) => ticket.status === column.id)
								: tickets.filter(
										(ticket) => ticket.status === column.id && ticket.project._id === project
									);

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
