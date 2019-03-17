const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const passport = require('passport');

const Ticket = require('../../models/Ticket');
const Project = require('../../models/Project');
const User = require('../../models/User');

// @route GET api/tickets/
// @desc Get all tickets
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	Ticket.find()
		.populate('assignee', [ 'name', 'avatar' ])
		.populate('createdBy', [ 'name', 'avatar' ])
		.populate('project', [ 'name', 'privateProject', 'owner' ])
		.populate('subProject', [ 'name' ])
		.then((tickets) => {
			const filteredTickets = tickets.filter((ticket) => {
				const { privateProject, owner } = ticket.project;
				if (privateProject && owner != req.user.id) {
					return false;
				}
				return true;
			});
			res.json(filteredTickets);
		})
		.catch((err) => res.status(404).json({ err }));
});

// @route GET api/tickets/:id
// @desc Get a ticket
// @access Private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Ticket.findById(req.params.id)
		.populate('createdBy', [ 'name', 'avatar' ])
		.populate('assignee', [ 'name', 'avatar' ])
		.populate('project', [ 'name' ])
		.populate('subProject', [ 'name' ])
		.then((ticket) => {
			Project.findById(ticket.project._id).then((project) => {
				if (project.privateProject && project.owner != req.user.id) {
					return res.status(404).json({ notAllowed: 'You are not allowed to see this ticket' });
				}

				return res.json(ticket);
			});
		})
		.catch((err) => res.status(404).json({ err }));
});

// @route POST api/tickets/
// @desc Create a ticket
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { project, ticketType, title, description, assignee, priority } = req.body;

	const ticketFields = {
		project,
		ticketType,
		title,
		description,
		assignee,
		priority
	};

	if (!project || !assignee || !ticketType || !title) {
		return res.status(404).json({ error: 'Some fields are missing' });
	}

	User.findById(req.user.id).populate('createdBy', [ 'name', 'avatar' ]).then((createdBy) => {
		User.findById(ticketFields.assignee).populate('assignee', [ 'name', 'avatar' ]).then((assignee) => {
			ticketFields.createdBy = createdBy;
			ticketFields.assignee = assignee;

			const newticket = new Ticket(ticketFields);
			newticket
				.save()
				.then((ticket) => {
					res.json(ticket);
				})
				.catch((err) => res.status(404).json({ err }));
		});
	});
});

// @route POST api/tickets/:id
// @desc Edit a ticket
// @access Private
router.post('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	const {
		project,
		subProject,
		ticketType,
		title,
		description,
		component,
		assignee,
		sprint,
		priority,
		status
	} = req.body;

	const ticketFields = {
		project,
		subProject,
		ticketType,
		title,
		description,
		component,
		assignee,
		sprint,
		priority,
		status
	};

	Ticket.findByIdAndUpdate(req.params.id, { $set: ticketFields }, { new: true })
		.then((updatedTicket) => res.json(updatedTicket))
		.catch((err) => res.status(404).json({ err }));
});

// @route DELETE api/tickets/:id
// @desc Get all tickets
// @access Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Ticket.findById(req.params.id).then((ticket) => {
		if (ticket.createdBy == req.user.id) {
			ticket
				.remove()
				.then(() => {
					res.json({ success: true });
				})
				.catch((err) => res.json({ notFound: 'ticketNotFound' }));
		} else {
			res.status(404).json({ notPermitted: 'You are not permitted to delete this ticket' });
		}
	});
});

module.exports = router;
