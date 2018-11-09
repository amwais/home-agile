const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load user model
const User = require('../../models/User');

// @route POST api/users/register
// @desc Register a user
// @access Public
router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({
		email: req.body.email
	}).then((user) => {
		if (user) {
			res.status(400).json({ email: 'Email already exists' });
		} else {
			const avatar = gravatar.url(req.body.email, {
				s: '200',
				r: 'pg',
				d: 'mm'
			});

			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				avatar,
				password: req.body.password
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) {
						throw err;
					}
					newUser.password = hash;
					newUser
						.save()
						.then((user) => {
							res.json({ user });
						})
						.catch((err) => console.log(err));
				});
			});
		}
	});
});

// @route POST api/users/login
// @desc Returns a token
// @access Public
router.post('/login', (req, res) => {
	const { email, password } = req.body;

	const { isValid, errors } = validateLoginInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	// Find a user by email
	User.findOne({
		email
	}).then((user) => {
		if (!user) {
			return res.status(404).json({ email: 'User not found' });
		}

		// Check password
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				// User found

				// Create JWT payload
				const payload = {
					id: user.id,
					name: user.name,
					avatar: user.avatar
				};

				// Sign Token
				jwt.sign(payload, keys.secretOrKey, { expiresIn: 7200 }, (err, token) => {
					res.json({ token: `Bearer ${token}` });
				});
			} else {
				return res.status(400).json({ password: 'Password incorrect' });
			}
		});
	});
});

// @route GET api/users/
// @desc Get all users
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	User.find().then((users) => res.json(users)).catch((err) => res.status(404).json({ err }));
});

// @route GET api/users/:id
// @desc Get a user
// @access Private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	User.findById(req.params.id).then((user) => res.json(user)).catch((err) => res.status(404).json({ err }));
});

module.exports = router;
