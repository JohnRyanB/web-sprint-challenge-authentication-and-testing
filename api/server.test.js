// Write your tests here
const db = require("../data/dbConfig");
const server = require("./server");

const request = require("supertest");

const newUser1 = { username: "Kyle", password: "REDragon" };
const falseUser = { username: "AdamCole", password: "BayBay" };

beforeAll(async () => {
	await db.migrate.rollback();
	await db.migrate.latest();
});

afterAll(async () => {
	await db.destroy();
});

describe("auth /register correctly registers user?", () => {
	test("give proper response to new user creation", async () => {
		let res = await request(server).post("/api/auth/register").send(newUser1);
		expect(res.statusCode).toBe(201);
	});
	test("making duplicates does not work", async () => {
		let res = await request(server).post("/api/auth/register").send(newUser1);
		expect(res.statusCode).toBe(401);
	});
});

describe("auth /login correctly logs in user and generates token", () => {
	test("respods with proper status code on login", async () => {
		let res = await request(server).post("/api/auth/login").send(newUser1);
		expect(res.statusCode).toBe(200);
	});
	test("gives proper response status if creds are not correct", async () => {
		let res = await request(server).post("/api/auth/login").send(falseUser);
		expect(res.statusCode).toBe(401);
		expect(res.text).toBe('{"message":"invalid credentials"}');
	});
});
