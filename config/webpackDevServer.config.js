const evalSourceMapMiddleware = require("../scripts/utils/evalSourceMapMiddleware")
const ignoredFiles = require("../scripts/utils/ignoredFiles")
const paths = require("./paths")

const host = process.env.HOST || "0.0.0.0"
const sockHost = process.env.WDS_SOCKET_HOST
const sockPath = process.env.WDS_SOCKET_PATH // default: '/ws'
const sockPort = process.env.WDS_SOCKET_PORT

module.exports = () => ({
	devServer: {
		allowedHosts: "all",
		headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "*", "Access-Control-Allow-Headers": "*"},
		// Enable gzip compression of generated files.
		compress: true,
		static: {
			directory: paths.appPublic,
			// By default, files from `contentBase` will not trigger a page reload.
			watch: {
				// Reportedly, this avoids CPU overload on some systems.
				// https://github.com/facebook/create-react-app/issues/293
				// src/node_modules is not ignored to support absolute imports
				// https://github.com/facebook/create-react-app/issues/1065
				ignored: ignoredFiles(paths.appSrc),
			},
		},
		client: {
			webSocketURL: {
				// Enable custom sockjs pathname for websocket connection to hot reloading server.
				// Enable custom sockjs hostname, pathname and port for websocket connection
				// to hot reloading server.
				hostname: sockHost,
				pathname: sockPath,
				port: sockPort,
			},
			overlay: {errors: true, warnings: false},
		},
		devMiddleware: {
			// It is important to tell WebpackDevServer to use the same "publicPath" path as
			// we specified in the webpack config. When homepage is '.', default to serving
			// from the root.
			// remove last slash so user can land on `/test` instead of `/test/`
			publicPath: paths.publicUrlOrPath.slice(0, -1),
			writeToDisk: true,
		},
		server: process.env.HTTPS === "true" ? "https" : "http",
		host,
		historyApiFallback: {
			// Paths with dots should still use the history fallback.
			// See https://github.com/facebook/create-react-app/issues/387.
			disableDotRule: true,
			index: paths.publicUrlOrPath,
		},
		setupMiddlewares: (middlewares, devServer) => {
			// Keep `evalSourceMapMiddleware`
			// This lets us fetch source contents from webpack for the error overlay
			devServer.app.use(evalSourceMapMiddleware(devServer))
			return middlewares
		},
	},
})
