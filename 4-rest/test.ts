import { PORT } from "./constants";

const url = `http://localhost:${PORT}/`;

async function get(field: string, value: string) {
	let rv = await fetch(url+`?${field}=${encodeURI(value)}`);
	return await rv.json();
}

async function req(method: string, body: any) {
	let rv = await fetch(url, {
		method,
		headers: {'content-type': 'application/json'},
		body: JSON.stringify(body)
	});
	return await rv.json();
}

(async ()=> {
	let user1id = await req('POST', {
		name: 'test1',
		email: 'test1@ohmy.test'
	});
	console.log(`User created (id=${user1id})`);
	let user = await get('id', user1id);
	console.log(`User(id=${user1id}) retrieved`, user);
	let deletion = await req('DELETE', {id: user.id});
	console.log('Deletion:', deletion?'success':'failure');
	user = await get('name', 'test1');
	console.log(`User(name=test1) retrieved`, user);
})();