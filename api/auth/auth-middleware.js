const Users = require("../users/users-model");
const checkUsernameExists = (req, res, next) => {
	let { username } = req.body;
	Users.findBy({ username }).then(([user]) => {
		if (!user) {
			res.status(401).json({ message: "invalid credentials" });
		} else {
			next();
		}
	});
};

const checkFields = (req, res, next) => {
	let { username, password } = req.body;
	if (!username || !password) {
		res.status(401).json({ message: "username and password required" });
	} else {
		next();
	}
};

const checkUniqueUser = (req, res, next) => {
	let { username } = req.body;
	Users.findBy({ username }).then(([user]) => {
		if (!user) {
			next();
		} else {
			res.status(401).json({ message: "username taken" });
		}
	});
};

module.exports = { checkFields, checkUsernameExists, checkUniqueUser };
