import React, { PureComponent } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TicketCard from './TicketCard';
import { Divider } from 'semantic-ui-react';

class InnerList extends PureComponent {
	render() {
		const { ticket, index, onEditClick } = this.props;

		return (
			<div>
				<TicketCard onEditClick={onEditClick} ticket={ticket} index={index} />
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
							<InnerList onEditClick={props.onEditClick} key={i} ticket={ticket} index={i} />
						))}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

export default StatusColumn;
