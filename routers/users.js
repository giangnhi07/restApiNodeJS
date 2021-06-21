const express = require('express');
const router = express.Router();
const User = require('../model/user');

//getting all
router.get('/', async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//getting one
router.get('/:id', getUser, (req, res) => {
	res.json(res.user);
});

//creating one
router.post('/', async (req, res) => {
	const user = new User({
		name: req.body.name,
		age: req.body.age,
	});
	try {
		const newUser = await user.save();
		res.status(201).json(newUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});
//updating one
router.patch('/:id', getUser, async (req, res) => {
	if (req.body.name && req.body.age) {
		res.user.name = req.body.name;
		res.user.age = req.body.age;
		try {
			const udpateUser = await res.user.save();
			res.status(201).json(udpateUser);
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	} else {
		return res.status(400).json({ message: 'invalid name or age' });
	}
});
//deleting one
router.delete('/:id', getUser, async (req, res) => {
	try {
		await res.user.remove();
		res.status(201).json({ mess: 'Deleted successfully' });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

async function getUser(req, res, next) {
	let user;
	try {
		user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: 'Cannot find user' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
	res.user = user;
	next();
}

module.exports = router;
