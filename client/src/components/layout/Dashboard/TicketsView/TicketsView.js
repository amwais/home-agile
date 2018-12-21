import React, { Component, PureComponent } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import StatusColumn from './StatusColumn';

class InnerList extends PureComponent {
	render() {
		const { column, ticketMap, index } = this.props;
		const tickets = column.ticketIds.map((ticketId) => ticketMap[ticketId]);

		return <StatusColumn column={column} tickets={tickets} index={index} />;
	}
}

export default class TicketsView extends Component {
	state = {};

	componentDidMount() {
		this.props.fetchTickets();
		this.props.fetchUsers();
		this.props.fetchProjects();
		const { tickets } = this.props.ticket;
		this.props.populateTickets(tickets);
	}

	onDragStart = (start) => {};
	onDragUpdate = (update) => {};
	onDragEnd = (result) => {};

	render() {
		const { tickets } = this.props.ticket;
		const { ticketsView } = this.props;
		console.log(this.props);
		// console.log(tickets);

		// console.log(ticketsView);

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

									return (
										<InnerList key={column.id} column={column} ticketMap={tickets} index={index} />
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
