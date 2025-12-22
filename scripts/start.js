// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "development"
process.env.NODE_ENV = "development"

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
	throw err
})

// Ensure environment variables are read.
require("../config/env")

const chalk = require("chalk").default
const webpack = require("webpack")
const WebpackDevServer = require("webpack-dev-server")
const {spawn} = require("node:child_process")
const {choosePort, createCompiler, prepareUrls} = require("./utils/DevServerUtils")
const paths = require("../config/paths")
const configFactory = require("../config/webpack.config")
const createDevServerConfig = require("../config/webpackDevServer.config")
const {checkBrowsers} = require("./utils/browsersHelper")
const {watch} = require("node:fs")

const SSR_PORT = +process.env.PORT || 4000
const DEV_WS_PORT = 3000
const HOST = process.env.HOST || "0.0.0.0"

let ssrProcess

checkBrowsers(paths.appPath).then(() => {
	choosePort(HOST, SSR_PORT, DEV_WS_PORT).then((ssr_port, dev_ws_port) => {
		const config = configFactory("development")
		const protocol = process.env.HTTPS === "true" ? "https" : "http"
		const appName = require(paths.appPackageJson).name

		const urls = prepareUrls(protocol, HOST, ssr_port, paths.publicUrlOrPath.slice(0, -1))
		const compiler = createCompiler({appName, config, urls, webpack})
		const serverConfig = {...createDevServerConfig().devServer, host: HOST, port: dev_ws_port}
		const devServer = new WebpackDevServer(serverConfig, compiler)

		ssrProcess = startServer(ssr_port)

		devServer.startCallback(() => {
			console.log(chalk.cyan("Starting the development server...\n"))

			spawn("open", [urls.localUrlForBrowser])
		})

		function cleanUp() {
			ssrProcess.kill("SIGKILL")
			devServer.stop()
			process.exit()
		}

		;["SIGINT", "SIGTERM"].forEach(sig => {
			process.on(sig, cleanUp)
		})

		process.stdin.on("end", cleanUp)

		watch(paths.serverDir, {recursive: true}, _ => {
			ssrProcess.kill("SIGKILL")
			ssrProcess = startServer(ssr_port)
		})
	})
})

function startServer(SSR_PORT) {
	return spawn("bun", ["--env-file", ".env", "--env-file", ".env.local", "src/server/server.js"], {stdio: "inherit", env: {...process.env, SSR_PORT}})
}
