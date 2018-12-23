const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	description: {
		type: String
	},
	tickets: [
		{
			type: Schema.Types.ObjectId,
			ref: 'tickets'
		}
	],
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	privateProject: {
		type: Boolean,
		required: true
	}
});

module.exports = Project = mongoose.model('projects', ProjectSchema);
