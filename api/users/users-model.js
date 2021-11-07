const db = require("../../data/dbConfig");

function findBy(filter) {
	return db("users").where(filter);
}

async function add(user) {
	const [newUser_id] = await db("users").insert(user);
	return findBy(newUser_id).first();
}

module.exports = { findBy, add };
