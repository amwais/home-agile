import React, { PureComponent } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TicketCard from './TicketCard';

class InnerList extends PureComponent {
	render() {
		const { ticket, index } = this.props;

		return <TicketCard ticket={ticket} index={index} />;
	}
}

const StatusColumn = (props) => {
	const { tickets } = props;

	return (
		<Droppable droppableId={props.column.id}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
					style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'yellow' }}
				>
					<h3>{props.column.title}</h3>
					{tickets.map((ticket, i) => <InnerList key={i} ticket={ticket} index={i} />)}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

export default StatusColumn;
