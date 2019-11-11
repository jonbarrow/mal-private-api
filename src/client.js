const got = require('got');
const querystring = require('querystring');

class MalClient {
	constructor() {
		this._apiBase = 'https://api.myanimelist.net/v0.8';
		this._clientId = '6114d00ca681b7701d1e15fe11a4987e';

		this._session = {};
	}

	_getRequest(endpoint, query) {
		return got.get(`${this._apiBase}${endpoint}?${query}`, {
			json: true
		});
	}

	_postRequest(endpoint, body) {
		return got.post(`${this._apiBase}${endpoint}`, {
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			body
		});
	}

	_setAuthSession(data) {
		const expires = Date.now() + (data.expires_in * 1000);
		const authType = data.token_type;
		const tokens = {
			access: data.access_token,
			refresh: data.refresh_token
		};

		this._session = {
			expires,
			authType,
			tokens
		};
	}

	async deviceTokens(token, device) {
		const response = await got.post(`${this._apiBase}/users/@me/device_tokens`, {
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				'authorization': 'Bearer ' + this._session.tokens.access
			},
			body: querystring.stringify({
				device_token: token,
				device_type: device,
			})
		});

		// got does not allow the `json` option to be set on POST requests with a non-JSON body. Have to manually parse response
		const data = JSON.parse(response.body);

		return data;
	}

	async login(username, password) {
		const response = await this._postRequest('/auth/token', querystring.stringify({
			client_id: this._clientId,
			username,
			password,
			grant_type: 'password'
		}));

		// got does not allow the `json` option to be set on POST requests with a non-JSON body. Have to manually parse response
		const data = JSON.parse(response.body);

		this._setAuthSession(data);

		return data;
	}

	async refreshLogin(token) {
		const response = await got.post('https://myanimelist.net/v1/oauth2/token', {
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			body: querystring.stringify({
				client_id: this._clientId,
				refresh_token: token,
				grant_type: 'refresh_token'
			})
		});

		// got does not allow the `json` option to be set on POST requests with a non-JSON body. Have to manually parse response
		const data = JSON.parse(response.body);

		this._setAuthSession(data);

		return data;
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