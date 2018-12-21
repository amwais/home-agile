const initialState = {
	columns: {
		toDo: {
			id: 'toDo',
			title: 'To Do',
			ticketIds: []
		},
		inProgress: {
			id: 'inProgress',
			title: 'In progress',
			ticketIds: []
		},
		inReview: {
			id: 'inReview',
			title: 'In Review',
			ticketIds: []
		},
		done: {
			id: 'done',
			title: 'Done',
			ticketIds: []
		}
	},
	tickets: [],
	colIds: [ 'toDo', 'inProgress', 'inReview', 'done' ]
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_TICKET_IDS':
			return {
				...state,
				tickets: action.payload
			};
		case 'POPULATE_TICKETS':
			return {
				...state,
				columns: action.payload
			};
		default:
			return state;
	}
};
