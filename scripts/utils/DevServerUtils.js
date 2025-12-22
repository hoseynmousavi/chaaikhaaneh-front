const address = require("address")
const url = require("node:url")
const chalk = require("chalk").default
const detect = require("detect-port-alt")
const prompts = require("prompts")
const formatWebpackMessages = require("./formatWebpackMessages")
const forkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")

const isInteractive = process.stdout.isTTY

function prepareUrls(protocol, host, port, pathname = "/") {
	const formatUrl = hostname => url.format({protocol, hostname, port, pathname})
	const prettyPrintUrl = hostname => url.format({protocol, hostname, port: chalk.bold(port), pathname})

	const isUnspecifiedHost = host === "0.0.0.0" || host === "::"
	let prettyHost, lanUrlForConfig, lanUrlForTerminal
	if (isUnspecifiedHost) {
		prettyHost = "localhost"
		lanUrlForConfig = address.ip()
		lanUrlForTerminal = prettyPrintUrl(lanUrlForConfig)
	} else {
		prettyHost = host
	}
	const localUrlForTerminal = prettyPrintUrl(prettyHost)
	const localUrlForBrowser = formatUrl(prettyHost)
	return {lanUrlForConfig, lanUrlForTerminal, localUrlForTerminal, localUrlForBrowser}
}

function printInstructions(appName, urls) {
	console.log()
	console.log(`You can now view ${chalk.bold(appName)} in the browser.`)
	console.log()

	console.log(`  ${chalk.bold("Local:")}            ${urls.localUrlForTerminal}`)

	if (urls.lanUrlForTerminal) {
		console.log(`  ${chalk.bold("On Your Network:")}  ${urls.lanUrlForTerminal}`)
	}

	console.log()
}

function createCompiler({appName, config, urls, webpack}) {
	// "Compiler" is a low-level interface to webpack.
	// It lets us listen to some events and provide our own custom messages.
	let compiler
	try {
		compiler = webpack(config)
	} catch (err) {
		console.log(chalk.red("Failed to compile."))
		console.log()
		console.log(err.message || err)
		console.log()
		process.exit(1)
	}

	// "invalid" event fires when you have changed a file, and the webpack is
	// recompiling a bundle. WebpackDevServer takes care to pause serving the
	// bundle, so if you refresh, it'll wait instead of serving the old one.
	// "invalid" is short for "bundle invalidated", it doesn't imply any errors.
	compiler.hooks.invalid.tap("invalid", () => {
		console.log("Compiling...")
	})

	let isFirstCompile = true

	forkTsCheckerWebpackPlugin.getCompilerHooks(compiler).waiting.tap("awaitingTypeScriptCheck", () => {
		console.log(chalk.yellow("Files successfully emitted, waiting for typecheck results..."))
	})

	// "Done" event fires when the webpack has finished recompiling the bundle.
	// Whether or not you have warnings or errors, you will get this event.
	compiler.hooks.done.tap("done", async stats => {
		// We have switched off the default webpack output in WebpackDevServer
		//  options, so we are going to "massage" the warnings and errors and present
		// them in a readable focused way.
		// We only construct the warnings and errors for speed:
		// https://github.com/facebook/create-react-app/issues/4492#issuecomment-421959548
		const statsData = stats.toJson({all: false, warnings: true, errors: true})

		const messages = formatWebpackMessages(statsData)
		const isSuccessful = !messages.errors.length && !messages.warnings.length
		if (isSuccessful) console.log(chalk.green("Compiled successfully!"))
		if (isSuccessful && (isInteractive || isFirstCompile)) printInstructions(appName, urls)
		isFirstCompile = false

		// If errors exist, only show errors.
		if (messages.errors.length) {
			// Only keep the first error. Others are often indicative
			// of the same problem but confuse the reader with noise.
			if (messages.errors.length > 1) messages.errors.length = 1
			console.log(chalk.red("Failed to compile.\n"))
			console.log(messages.errors.join("\n\n"))
			return
		}

		// Show warnings if no errors were found.
		if (messages.warnings.length) {
			console.log(chalk.yellow("Compiled with warnings.\n"))
			console.log(messages.warnings.join("\n\n"))
		}
	})

	return compiler
}

function choosePort(host, ssr_port, dev_ws_port) {
	return Promise.all([detect(ssr_port, host), detect(dev_ws_port, host)]).then(([ssrPort, devWsPort]) => {
		return new Promise((resolve, reject) => {
			if (ssrPort === ssr_port) {
				resolve(ssrPort, devWsPort)
			} else {
				const message = `Something is already running on port ${ssr_port}.`
				if (isInteractive) {
					const question = {type: "confirm", name: "shouldChangePort", message: `${chalk.yellow(message)}\n\nWould you like to run the app on another port instead?`, initial: true}
					prompts(question).then(answer => {
						if (answer.shouldChangePort) resolve(ssrPort, devWsPort)
						else reject(null)
					})
				} else {
					console.log(chalk.red(message))
					reject(null)
				}
			}
		})
	})
}

module.exports = {choosePort, createCompiler, prepareUrls}
