const got = require('got');
const querystring = require('querystring');

class MalClient {
	constructor() {
		this._apiBase = 'https://api.myanimelist.net/v0.8';
	}

	_getRequest(endpoint, query) {
		return got.get(`${this._apiBase}${endpoint}?${query}`, {
			json: true
		});
	}

	async getCurrentlyAiring(options) {
		options = {
			offset: 0, // Default offset
			limit: 10, // Default limit
			...options
		};

		const query = querystring.stringify({
			status: 'currently_airing',
			offset: options.offset,
			limit: options.limit,
		});

		const response = await this._getRequest('/anime/search', query);

		return response.body;
	}
}

module.exports = MalClient;