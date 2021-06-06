const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	light_intensity: {
		value: Number
	},
	humidity: {
		value: Number
	},
	temperatures: {
		inside: Number,
		outside: Number
	},
	time: {
		date: String,
		time: String
	}
});

module.exports = new mongoose.model('History', schema);