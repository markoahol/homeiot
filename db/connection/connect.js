const mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.DBUSER}:${process.env.DBPW}@${process.env.DBIP}/arduino`, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, (err) => {
	if (!err) {
		console.log('Connected to database');
	} else {
		console.log(err);
	}
});

module.exports = mongoose.connection;