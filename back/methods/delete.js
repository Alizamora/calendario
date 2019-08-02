const {
	getPath,
	end,
	isPathInURL,
} = require('../utilities');

function DELETE(req, res, collection, ObjectId) {
	const urlId = getPath(req.url)[4];
	if (isPathInURL(req.url, '/api/v1/events') && urlId) {
		const _id = new ObjectId(urlId);
		collection.deleteOne({_id}, err =>{
			if (err){
				end(res, 'error', 'it couldn\'t be deleted');
			}
			end(res, 'success', '_id deleted');
		});
	} else {
		end(res, 'error', 'invalid route');
	}
}

module.exports = DELETE;