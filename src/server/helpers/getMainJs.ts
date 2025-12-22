import fs from "node:fs"
import path from "node:path"

const buildPath = process.env.NODE_ENV === "production" ? "./build" : "./build-dev"

let jsLink = ""

function readFile() {
	fs.readFile(path.resolve(`${buildPath}/asset-manifest.json`), "utf-8", (err, data) => {
		if (!err) {
			jsLink = JSON.parse(data).files["main.js"]
		} else {
			setTimeout(readFile, 1000)
		}
	})
}

readFile()

function getMainJs() {
	return jsLink
}

export default getMainJs
