var dev = process.env.BWBDEV ? true : false

module.exports = {
	'secret': 'eichwaldcarlsonking',
	'database': 'mongodb://localhost/doghouse',
	'apiUrl' : dev ? 'http://localhost:3001' : ''
};

