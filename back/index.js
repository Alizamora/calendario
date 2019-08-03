const { connect, end } = require('./utilities');
const methods = {
	POST: require('./methods/post'),
	GET: require('./methods/get'),
	PUT: require('./methods/put'),
	DELETE: require('./methods/delete')
};

connect((req, res, collection, ObjectId) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	if (methods[req.method]) {
		methods[req.method](req, res, collection, ObjectId);
	} else if (req.method === 'OPTIONS') {
		end(res, 'success', 'cool');
	} else {
		end(res, 'error', 'not registered method');
	}
});
