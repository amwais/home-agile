import React, { PureComponent } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TicketCard from './TicketCard';
import { Divider, Button } from 'semantic-ui-react';

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
	tickets.sort((a, b) => (a.priority > b.priority ? 1 : -1));

	return (
		<Droppable droppableId={props.column.id} type="ticket">
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
					style={{
						width: '300px'
					}}
				>
					<div
						style={{
							position: 'sticky',
							top: '0',
							zIndex: '2'
						}}
					>
						<Button
							fluid
							color="green"
							style={{
								//fontFamily: 'Courier New',
								color: 'black',
								fontSize: '18px',
								backgroundColor: snapshot.isDraggingOver ? 'rgba(51, 102, 255, 0.9)' : undefined
								//opacity: '0.9'
							}}
						>
							{props.column.title}
						</Button>
						<Divider clearing />
					</div>

					<div
						style={{
							height: snapshot.isDraggingOver ? '95%' : 'inherit',
							border: snapshot.isDraggingOver ? '3px dashed black' : 'none',
							backgroundColor: snapshot.isDraggingOver ? 'rgba(51, 102, 255, 0.2)' : 'inherit'
						}}
					>
						{tickets.map((ticket, i) => (
							<InnerList
								toggleEditTicket={props.toggleEditTicket}
								key={i}
								ticket={ticket}
								index={i}
								toggleDisplayTicket={props.toggleDisplayTicket}
							/>
						))}
					</div>

					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

export default StatusColumn;
