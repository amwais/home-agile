module.exports = {
	mongoURI:
		process.env.NODE_ENV === 'production'
			? 'mongodb://amwais:q1w2e3r4@ds145463.mlab.com:45463/home-agile'
			: 'mongodb://amwais:q1w2e3r4@ds145474.mlab.com:45474/home-agile-staging',
	secretOrKey: 'secret'
};
