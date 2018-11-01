const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
	project: {
		// type: ObjectId,
		type: String,
		ref: 'projects',
		required: true
	},
	subProject: {
		// type: ObjectId,
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
		// type: ObjectId,
		type: String,
		ref: 'components'
	},
	assignee: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	priority: {
		type: Number
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

module.exports = User = mongoose.model('tickets', TicketSchema);
