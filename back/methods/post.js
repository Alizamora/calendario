const { end, isPathInURL, parseBoolean, getBody } = require('../utilities');

function getValidHour(hour) {
	hour = Math.abs(Math.floor(+hour));
	return hour < 24 ? hour : null;
};

function isValidDate(date) {
	if (/(\d+)-(\d+)-(\d+)/.test(date)) {
		return !!new Date(date).getDate();
	}
	return false;
}

function POST(req, res, collection, ObjectId) {
	if (isPathInURL(req.url, '/api/v1/events')) {
		getBody(req, ({ date, hour, name, favorite, notes }) => {
			const body = { date, hour, name, favorite, notes };
			body.hour = getValidHour(body.hour);
			body.date = isValidDate(body.date) ? date : null;
			body.favorite = parseBoolean(body.favorite);

			collection.find({ date: body.date, hour: body.hour })
				.toArray((err, result) => {
					if (err) return end(res, 'error', err);
					if (!result.length &&
						body.date &&
						body.hour &&
						body.name) {

						collection.insertOne(body, () => {
							end(res, 'success', body);
						});
					} else {
						end(res, 'error', 'there is already an event with the same hour and date');
					}
				});
		});
	} else {
		end(res, 'error', 'invalid route');
	}
}

module.exports = POST;