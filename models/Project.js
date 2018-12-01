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
	tickets: {
		type: Array
	},
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
