const redis = require("redis");

//singleton class for connection to redis.
class DBConnection {
	constructor() {
		if (!DBConnection.instance) {
			// Create a new Redis client
			this.client = redis.createClient({
				password: process.env.REDISPW,
				socket: {
					host: "redis-10082.c84.us-east-1-2.ec2.cloud.redislabs.com",
					port: 10082,
				},
			});

			this.client.on("error", (err) => {
				console.error("Error encountered: ", err);
			});

			this.client.on("connect", (err) => {
				console.log("Connected to redis");
			});

			this.client.on("end", () => {
				console.log("Disconnected from redis");
			});

			DBConnection.instance = this;
		}
		return DBConnection.instance;
	}
}

module.exports = DBConnection;
