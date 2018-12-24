const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const sprints = require('./routes/api/sprints');
const tickets = require('./routes/api/tickets');
const projects = require('./routes/api/projects');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config

const db = require('./config/keys').mongoURI;

// Connect to MongoDB

mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log('MongoDB connected.'))
	.catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport strategy config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/sprints', sprints);
app.use('/api/tickets', tickets);
app.use('/api/projects', projects);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}...`));
