// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "production"
process.env.NODE_ENV = "production"

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
	throw err
})

// Ensure environment variables are read.
require("../config/env")

const chalk = require("chalk").default
const fs = require("fs-extra")
const bfj = require("bfj")
const webpack = require("webpack")
const configFactory = require("../config/webpack.config")
const paths = require("../config/paths")
const formatWebpackMessages = require("./utils/formatWebpackMessages")
const printBuildError = require("./utils/printBuildError")
const {checkBrowsers} = require("./utils/browsersHelper")

const argv = process.argv.slice(2)
const writeStatsJson = argv.indexOf("--stats") !== -1

// Generate configuration
const config = configFactory("production")

// We require that you explicitly set browsers and do not fall back to
// browserslist defaults.
checkBrowsers(paths.appPath).then(() => {
	// Remove all content but keep the directory so that
	// if you're in it, you don't end up in Trash
	fs.emptyDirSync(paths.appBuild)
	// Merge with the public folder
	fs.copySync(paths.appPublic, paths.appBuild, {dereference: true})
	// Start the webpack build
	build()
		.then(({warnings}) => {
			if (warnings.length) {
				console.log(chalk.yellow("Compiled with warnings.\n"))
				console.log(warnings.join("\n\n"))
			} else {
				console.log(chalk.green("Compiled successfully.\n"))
			}
		})
		.catch(err => {
			console.log(chalk.red("Failed to compile.\n"))
			printBuildError(err)
		})
})

// Create the production build and print the deployment instructions.
function build() {
	console.log("Creating an optimized production build...")

	const compiler = webpack(config)
	return new Promise((resolve, reject) => {
		compiler.run((err, stats) => {
			let messages
			if (err) {
				if (!err.message) {
					return reject(err)
				}

				let errMessage = err.message

				// Add additional information for postcss errors
				if (Object.hasOwn(err, "postcssNode")) {
					errMessage += `\nCompileError: Begins at CSS selector ${err.postcssNode.selector}`
				}

				messages = formatWebpackMessages({errors: [errMessage], warnings: []})
			} else {
				messages = formatWebpackMessages(stats.toJson({all: false, warnings: true, errors: true}))
			}
			if (messages.errors.length) {
				// Only keep the first error. Others are often indicative
				// of the same problem but confuse the reader with noise.
				if (messages.errors.length > 1) {
					messages.errors.length = 1
				}
				return reject(new Error(messages.errors.join("\n\n")))
			}

			const resolveArgs = {warnings: messages.warnings}

			if (writeStatsJson) {
				return bfj
					.write(`${paths.appBuild}/bundle-stats.json`, stats.toJson())
					.then(() => resolve(resolveArgs))
					.catch(error => reject(new Error(error)))
			}

			return resolve(resolveArgs)
		})
	})
}
