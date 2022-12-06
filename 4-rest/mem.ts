import type { User } from "./constants";

const memDB: User[] = [];

export async function addUser(user: User): Promise<string> {
	user.id = Math.floor(Math.random()*Math.pow(36, 10)).toString(36);
	memDB.push(user);
	return user.id;
}

export async function removeUser(id: string): Promise<boolean> {
	const ndx = memDB.findIndex(u=> u.id == id);
	if(!~ndx) return false;
	memDB.splice(ndx, 1);
	return true;
}

export async function getUserBy(field: string, value: string): Promise<User> {
	return memDB.find(u=> u[field] == value) || null;
}