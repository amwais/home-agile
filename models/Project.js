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
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	members: [
		{
			type: Schema.Types.ObjectId,
			ref: 'users'
		}
	],
	createdAt: {
		type: Date,
		default: Date.now()
	}
});

module.exports = Project = mongoose.model('projects', ProjectSchema);
