var dev = process.env.NODE_ENV === 'development' ? true : false
module.exports = {
	'secret': 'eichwaldcarlsonking',
	'database': 'mongodb://localhost/doghouse',
	'apiUrl' : dev ? 'http://localhost:3001' : '',
	'env': dev ? 'dev' : 'prod'
};

