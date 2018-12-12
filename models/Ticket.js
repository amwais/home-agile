const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
	project: {
		type: Schema.Types.ObjectId,
		ref: 'projects',
		required: true
	},
	subProject: {
		// type: Schema.Types.ObjectId,
		type: String,
		ref: 'subProjects'
	},
	ticketType: {
		type: String
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	component: {
		// type: Schema.Types.ObjectId,
		type: String,
		ref: 'components'
	},
	assignee: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	priority: {
		// type: Number
		type: String
	},
	sprint: {
		type: Number
	},
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	createdAt: {
		type: Date,
		default: Date.now()
	}
});

module.exports = Ticket = mongoose.model('tickets', TicketSchema);
