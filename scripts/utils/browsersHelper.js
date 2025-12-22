const browserslist = require("browserslist")
const chalk = require("chalk").default

function checkBrowsers(dir) {
	const current = browserslist.loadConfig({path: dir})
	if (current != null) {
		return Promise.resolve(current)
	}

	return Promise.reject(new Error(`${chalk.red("you must specify targeted browsers.")}Please add a ${chalk.underline("browserslist")} key to your ${chalk.bold("package.json")}.`))
}

module.exports = {checkBrowsers}
