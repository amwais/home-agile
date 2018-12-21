import React, { Component, PureComponent } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import StatusColumn from './StatusColumn';

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

	onDragStart = (start) => {};
	onDragUpdate = (update) => {};
	onDragEnd = (result) => {};

	render() {
		const { tickets } = this.props.ticket;
		const { ticketsView } = this.props;

		return (
			<div>
				<DragDropContext
					onDragEnd={this.onDragEnd}
					onDragStart={this.onDragStart}
					onDragUpdate={this.onDragUpdate}
				>
					<Droppable droppableId="all-cols" direction="horizontal">
						{(provided) => (
							<div
								style={{
									display: 'flex'
								}}
								{...provided.droppableProps}
								ref={provided.innerRef}
							>
								{ticketsView.colIds.map((colId, index) => {
									const column = ticketsView.columns[colId];

									const colTickets = tickets.filter((ticket) => ticket.status === column.id);

									return (
										<InnerList key={column.id} column={column} index={index} tickets={colTickets} />
									);
								})}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</div>
		);
	}
}
