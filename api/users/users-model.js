const db = require("../../data/dbConfig");

async function findBy(username) {
	const userId = await db("users")
		.select("users.id", "users.username", "users.password")
		.where("users.username", username)
		.first();
	return userId;
}

async function add(user) {
	const newUser = await db("users").insert(user);
	return findBy(newUser);
}

module.exports = { findBy, add };
