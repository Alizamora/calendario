const { 
	end, 
	isPathInURL, 
	year, 
	month, 
	getDateRegExp, 
	getPath, 
	day, 
	getQueries
} = require('../utilities');

function GET(req, res, collection, ObjectId) {
	const urlPath = getPath(req.url);
	const { search } = getQueries(req.url);
	const currentDate = getDateRegExp({
		month: month(),
		year: year()
	});

	if (isPathInURL(req.url, '/api/v1/months')) {
		const urlYear = urlPath[4];
		const urlMonth = urlPath[5];
		const urlDateRegExp = getDateRegExp({ month: urlMonth, year: urlYear });
		const isValidMonth = urlMonth > 0 && urlMonth < 13;
		const urlDate = +urlYear && +urlMonth && isValidMonth ? urlDateRegExp : null;

		collection.find({ date: urlDate ? urlDate : currentDate })
			.toArray((err, result) => {
				if (err) return end(res, 'error', err);
				end(res, 'success', result);
			});
	} else if (isPathInURL(req.url, '/api/v1/events')) {
		const date = urlPath[4];
		const searchRegExp = new RegExp(search ? search : '');
		const fullCurrentDate = getDateRegExp({
			month: month(),
			year: year(),
			day: day()
		});

		collection.find({ date: date ? date : fullCurrentDate, name: searchRegExp })
			.toArray((err, result) => {
				if (err) return end(res, 'error', err);
				end(res, 'success', result);
			});

	} else {
		end(res, 'error', 'invalid route');
	}

}


module.exports = GET;

