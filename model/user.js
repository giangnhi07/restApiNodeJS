const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	age: {
		type: String,
		required: true,
	},
	birthday: {
		type: 'date',
		required: true,
		default: Date.now,
	},
});

module.exports = mongoose.model('User',usersSchema)