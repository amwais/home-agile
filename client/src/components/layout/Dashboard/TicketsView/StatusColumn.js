import React, { PureComponent } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TicketCard from './TicketCard';
import { Divider } from 'semantic-ui-react';

class InnerList extends PureComponent {
	render() {
		const { ticket, index, toggleEditTicket, toggleDisplayTicket } = this.props;

		return (
			<div>
				<TicketCard
					toggleDisplayTicket={toggleDisplayTicket}
					toggleEditTicket={toggleEditTicket}
					ticket={ticket}
					index={index}
				/>
				<Divider hidden />
			</div>
		);
	}
}

const StatusColumn = (props) => {
	const { tickets } = props;

	return (
		<Droppable droppableId={props.column.id} type="ticket">
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
					style={{
						width: '300px'
						//backgroundColor: snapshot.isDraggingOver ? 'rgba(53,81,92, 0.6)' : 'inherit'
					}}
				>
					<h3>{props.column.title}</h3>
					<Divider />
					{tickets
						.sort((a, b) => (a.priority > b.priority ? 1 : -1))
						.map((ticket, i) => (
							<InnerList
								toggleEditTicket={props.toggleEditTicket}
								key={i}
								ticket={ticket}
								index={i}
								toggleDisplayTicket={props.toggleDisplayTicket}
							/>
						))}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

export default StatusColumn;
