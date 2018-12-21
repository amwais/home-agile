const initialState = {
	columns: {
		toDo: {
			id: 'toDo',
			title: 'To Do',
			ticketIds: []
		},
		inProgress: {
			id: 'inProgress',
			title: 'In Progress',
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
	colIds: [ 'toDo', 'inProgress', 'inReview', 'done' ]
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'POPULATE_TICKETS':
			return {
				...state,
				columns: action.payload
			};
		default:
			return state;
	}
};
