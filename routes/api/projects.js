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
		.populate('owner', [ 'name', 'avatar' ])
		.then((projects) => {
			let resProjects = projects.filter((project) => {
				if (!project.privateProject) {
					return true;
				} else {
					if (project.owner._id == req.user.id) {
						return true;
					}
				}
				return false;
			});
			res.json(resProjects);
		})
		.catch((err) => res.status(404).json({ err }));
});

// @route GET api/projects/:id
// @desc Get a project
// @access Private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Project.findById(req.params.id)
		.populate('owner', [ 'name', 'avatar' ])
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
// @desc Create a project
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { name, privateProject, tickets } = req.body;
	const projectFields = { name, privateProject, tickets };

	projectFields.owner = req.user.id;
	const newProject = new Project(projectFields);
	newProject.save().then((project) => res.json(project)).catch((err) => res.status(404).json({ err }));
});

// @route POST api/projects/:id
// @desc edit a project
// @access Private
router.post('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Project.findById(req.params.id)
		.then((project) => {
			if (project.owner == req.user.id) {
				const { name, privateProject, tickets, subProject } = req.body;
				const projectFields = { name, privateProject, tickets, subProject };
				Project.findByIdAndUpdate(req.params.id, { $set: projectFields }, { new: true })
					.then((updatedProject) => res.json(updatedProject))
					.catch((err) => res.status(404).json({ err }));
			} else {
				res.status(404).json({ Unauthorized: 'Cannot edit a project you do not own' });
			}
		})
		.catch((err) => res.status(404).json(err));
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
