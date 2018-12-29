module.exports = {
	mongoURI: process.env.NODE_ENV === 'production' ? process.env.PROD_DATABASE_URL : process.env.STAGING_DATABASE_URL,
	secretOrKey: 'secret'
};
