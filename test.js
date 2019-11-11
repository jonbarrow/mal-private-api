const MalClient = require('./');
const client = new MalClient();

(async () => {
	const currentlyAiring = await client.getCurrentlyAiring();
	console.log(currentlyAiring);

	console.log('Logging in user...');
	const session = await client.login('username', 'password');
	console.log(session);

	console.log('\n\nRefreshing oAuth token using refresh token...');
	const refresh = await client.refreshLogin(session.refresh_token);
	console.log(refresh);
})();