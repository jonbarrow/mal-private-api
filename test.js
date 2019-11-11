const MalClient = require('./');
const client = new MalClient();

(async () => {
	const currentlyAiring = await client.getCurrentlyAiring();

	console.log(currentlyAiring);
})();