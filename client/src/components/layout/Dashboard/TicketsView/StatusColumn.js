import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TicketCard from './TicketCard';

const StatusColumn = (props) => {
	const { tickets } = props;
	return (
		<div>
			<Droppable droppableId="all-cols" direction="horizontal" type="column">
				{(provided) => (
					<div {...provided.droppableProps} ref={provided.innerRef}>
						<h3>{props.column.title}</h3>
						{tickets.map((ticket, i) => <TicketCard key={i} ticket={ticket} />)}
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default StatusColumn;
