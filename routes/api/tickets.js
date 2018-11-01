const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const passport = require('passport');

const Ticket = require('../../models/Ticket');

// @route GET api/tickets/
// @desc Get all tickets
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	Ticket.find().then((tickets) => res.json(tickets)).catch((err) => res.status(404).json({ err }));
});

// @route GET api/tickets/:id
// @desc Get a tickets
// @access Private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Ticket.findById(req.params.id).then((ticket) => res.json(ticket)).catch((err) => res.status(404).json({ err }));
});

// @route POST api/tickets/
// @desc Create a new ticket
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { project, subProject, ticketType, title, description, component, assignee, sprint, priority } = req.body;
	const createdBy = req.user.id;
	const newticket = new Ticket({
		project,
		subProject,
		ticketType,
		title,
		description,
		component,
		assignee,
		sprint,
		createdBy,
		priority
	});

	newticket.save().then((ticket) => res.json(ticket)).catch((err) => res.status(404).json({ err }));
});

// @route DELETE api/tickets/:id
// @desc Get all tickets
// @access Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Ticket.findById(req.params.id).then((ticket) => {
		if (ticket.createdBy.toString() === req.user.id) {
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
