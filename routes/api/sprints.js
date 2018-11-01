const express = require('express');
const router = express.Router();

const passport = require('passport');
const moment = require('moment');
const sprints = require('../../utils/sprints');

// @route GET api/sprints/
// @desc Get current user
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const date = new Date();

	res.json({
		data: sprints.getYearSprints(2018)
	});
});

module.exports = router;
