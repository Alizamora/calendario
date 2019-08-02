const { end } = require('../utilities');

function DELETE(req, res, collection, ObjectId) {
	end(res, 'success', 'delete');
}

module.exports = DELETE;