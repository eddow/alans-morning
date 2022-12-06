
//import { addUser, getUserBy, removeUser } from './mongo';
import { addUser, getUserBy, removeUser } from './mem';

import express from 'express';
import bodyParser from 'body-parser';
import { PORT } from "./constants";

const app = express();

app.use(bodyParser.json());

app.get('/', async (req, res) => {
	console.log('GET', req.query);
	for(const field of ['id', 'name', 'email'])
		if(field in req.query)
			return res.send(JSON.stringify(await getUserBy(field, <string>req.query[field])));
	return res.status(400).send('Bad query');
});

app.post('/', async (req, res) => {
	console.log('POST', req.body);
	return res.send(JSON.stringify(await addUser(req.body)));
});

app.delete('/', async (req, res) => {
	console.log('DELETE', req.body);
	return res.send(JSON.stringify(await removeUser(req.body.id)));
});

app.listen(PORT, () =>
  console.log(`Listening...`),
);