const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const passport = require('passport');

const Project = require('../../models/Project');

// @route GET api/projects/
// @desc Get all projects
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	Project.find()
		.then((projects) => {
			if (projects.length < 1) {
				res.json({
					notFound: 'No projects found.'
				});
			} else {
				let resProjects = projects.filter((project) => {
					if (!project.privateProject) {
						return true;
					} else {
						if (project.owner == req.user.id) {
							return true;
						}
					}
					return false;
				});
				res.json(resProjects);
				// res.json(projects); // Return all
			}
		})
		.catch((err) => res.status(404).json({ err }));
});

// @route GET api/projects/:id
// @desc Get a project
// @access Private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Project.findById(req.params.id)
		.then((project) => {
			if (project) {
				res.json(project);
			} else {
				res.status(404).json({ notFound: 'Project not found.' });
			}
		})
		.catch((err) => res.status(404).json({ err }));
});

// @route POST api/projects/
// @desc Create or edit a project
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { _id, name, privateProject, tickets, owner } = req.body;
	const projectFields = { _id, name, privateProject, tickets, owner };

	if (_id !== undefined) {
		if (!projectFields.tickets) {
			projectFields.tickets = [];
		}

		Project.findById(_id).then((project) => {
			if (project.owner == req.user.id) {
				projectFields.owner = req.user.id;
				Project.findOneAndUpdate({ _id }, { $set: projectFields }, { new: true })
					.then((updatedProject) => res.json(updatedProject))
					.catch((err) => res.status(404).json({ err }));
			} else {
				res.status(404).json({ Unauthorized: 'Cannot edit a project you do not own' });
			}
		});
	} else {
		projectFields.owner = req.user.id;
		const newProject = new Project(projectFields);
		newProject.save().then((project) => res.json(project)).catch((err) => res.status(404).json({ err }));
	}
});

// @route DELETE api/projects/:id
// @desc Get all tickets
// @access Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Project.findById(req.params.id).then((project) => {
		project
			.remove()
			.then(() => {
				res.json({ success: true });
			})
			.catch((err) => res.json({ notFound: 'projectNotFound' }));
	});
});

module.exports = router;
