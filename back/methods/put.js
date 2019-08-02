const {
	getBody,
	getPath,
	end,
	isPathInURL,
	parseBoolean
} = require('../utilities');

function PUT(req, res, collection, ObjectId) {
	const urlId = getPath(req.url)[4];
	if (isPathInURL(req.url, '/api/v1/events') && urlId) {
		const _id = new ObjectId(urlId);
		getBody(req, ({ name, notes, favorite }) => {
			if (name) {
				favorite = parseBoolean(favorite);
				collection.updateOne({ _id }, { $set: { name, notes, favorite } });
				end(res, 'success', 'updated id');
			} else {
				end(res, 'error', 'name is required');
			}
		});
	} else {
		end(res, 'error', 'invalid route');
	}
}

module.exports = PUT;