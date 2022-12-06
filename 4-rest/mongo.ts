import type { User } from "./constants";
import { MongoClient, ObjectId } from "mongodb";

const uri = 'mongodb://127.0.0.1:27017/';

let users;

async function connect() {
	const client = await MongoClient.connect(uri),
		db = client.db('alan');
	users = db.collection('users');
	console.log('DB connected');
}
connect();	// We don't wait here

export async function addUser(user: User): Promise<string> {
	if(!users) throw new Error('Database not connected');
	let rv = await users.insertOne(user);
	return rv.insertedId.toString()
}

export async function removeUser(id: string): Promise<boolean> {
	if(!users) throw new Error('Database not connected');
	let rv = await users.deleteOne({_id: new ObjectId(id)});
	return rv.deletedCount == 1;
}

export async function getUserBy(field: string, value: string|ObjectId): Promise<User> {
	if(!users) throw new Error('Database not connected');
	let rv = await users.findOne(field == 'id' ? {_id: new ObjectId(value)} : {[field]: value});
	return rv && {
		name: rv.name,
		email: rv.email,
		id: rv._id.toString()
	};
}