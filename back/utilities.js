const year = () => new Date().getFullYear();
const month = () => new Date().getMonth() + 1;
const day = () => new Date().getDate();

function end(res, type, data) {
	const types = {
		error() {
			res.statusCode = 400;
			res.end(JSON.stringify({
				success: false,
				error: data,
				data: null
			}));
		},
		success() {
			res.statusCode = 200;
			res.end(JSON.stringify({
				success: true,
				error: null,
				data: data
			}));
		}
	}
	if (types[type]) types[type]();
	else console.error(`type ${type} is not registered in types object`);
}

function connect(call) {
	const http = require('http');
	const mongodb = require('mongodb');
	const MongoClient = mongodb.MongoClient;
	const ObjectId = mongodb.ObjectId;
	const {
		dbName,
		port,
		collectionName,
		connectionURL
	} = require('./config.json');

	MongoClient.connect(connectionURL, { useNewUrlParser: true })
		.then(connection => {
			const db = connection.db(dbName);
			const collection = db.collection(collectionName);

			http.createServer((req, res) => {
				call(req, res, collection, ObjectId);
			}).listen(port);
		})
		.catch(error => console.log('could not connect', error));
}

function isPathInURL(url, path) {
	return new RegExp(`^${path}`).test(url);
}

function getDateRegExp({month, year, day}) {
	const set = string => string ? string : '(.*)';
	return new RegExp(`${set(month)}-${set(day)}-${set(year)}`, 'i');
}

function getPath(urlString) {
	const url = require('url');
	return url.parse(urlString).pathname.split('/');
}

function getQueries(urlString) {
	const url = require('url');
	const qs = require('querystring');
	return qs.parse(url.parse(urlString).query);
}

function getBody(req, callback){
	const qs = require('querystring');
	let body = '';

	function parseQuery() {
		const data = qs.parse(body);
		callback(data);
		console.log(body);
	}

	req.on('data', query =>{
		body += query;
		if(body.split('&').length > 96) parseQuery();
	});
	req.on('end', parseQuery);
}

module.exports = {
	getBody,
	getQueries,
	getPath,
	connect,
	end,
	isPathInURL,
	year,
	month,
	day,
	getDateRegExp
}
