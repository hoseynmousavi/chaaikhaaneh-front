import fs from "node:fs"
import path from "node:path"

const buildPath = process.env.NODE_ENV === "production" ? "./build" : "./build-dev"

const css = {mainCSS: "", cssLink: ""}

function readFile() {
	fs.readFile(path.resolve(`${buildPath}/asset-manifest.json`), "utf-8", (err, data) => {
		if (!err) {
			const cssLink = JSON.parse(data).files["main.css"]
			fs.readFile(path.resolve(`${buildPath}${cssLink}`), "utf-8", (err, data) => {
				if (!err) {
					css.mainCSS = data
					css.cssLink = cssLink
				} else {
					setTimeout(readFile, 1000)
				}
			})
		} else {
			setTimeout(readFile, 1000)
		}
	})
}

readFile()

function getMainCSS() {
	return css
}

export default getMainCSS
