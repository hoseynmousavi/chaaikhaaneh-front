const paths = require("./paths")

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve("./paths")]

const NODE_ENV = process.env.NODE_ENV

const dotenvFiles = [`${paths.dotenv}`, `${paths.dotenv}.local`, `${paths.dotenv}.${NODE_ENV}.local`, `${paths.dotenv}.${NODE_ENV}`].filter(Boolean)

require("dotenv").config({path: dotenvFiles})

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in webpack configuration.
const REACT_APP = /^REACT_APP_/i

function getClientEnvironment() {
	const raw = Object.keys(process.env)
		.filter(key => REACT_APP.test(key))
		.reduce((env, key) => ({...env, [key]: process.env[key]}), {
			// Useful for determining whether we’re running in production mode.
			// Most importantly, it switches React into the correct mode.
			NODE_ENV: process.env.NODE_ENV,
			// We support configuring the sockjs pathname during development.
			// These settings let a developer run multiple simultaneous projects.
			// They are used as the connection `hostname`, `pathname` and `port`
			// in webpackHotDevClient. They are used as the `sockHost`, `sockPath`
			// and `sockPort` options in webpack-dev-server.
			WDS_SOCKET_HOST: process.env.WDS_SOCKET_HOST,
			WDS_SOCKET_PATH: process.env.WDS_SOCKET_PATH,
			WDS_SOCKET_PORT: process.env.WDS_SOCKET_PORT,
		})
	// Stringify all values so we can feed into webpack DefinePlugin
	return {raw, rawString: {"process.env": Object.keys(raw).reduce((env, key) => ({...env, [key]: JSON.stringify(raw[key])}), {})}}
}

module.exports = getClientEnvironment
