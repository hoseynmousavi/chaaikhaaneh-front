const path = require("node:path")

module.exports = function ignoredFiles(appSrc) {
	return new RegExp(`^(?!${RegExp.escape(path.normalize(`${appSrc}/`).replace(/\\+/g, "/"))}).+/node_modules/`, "g")
}
