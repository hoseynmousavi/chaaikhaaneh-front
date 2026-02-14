import fs from "node:fs"
import path from "node:path"
import type {Express, NextFunction} from "express"
import {ENV_CONSTANT} from "helpers/general/ENV_CONSTANT"
import setCacheHeader from "server/helpers/setCacheHeader"
import type {ExpressRequestType} from "types/ExpressRequestType"
import type {ExpressResponseType} from "types/ExpressResponseType"

const buildPath = process.env.NODE_ENV === "production" ? "./build" : "./build-dev"
const devPublicOrProductionBuildPath = process.env.NODE_ENV === "production" ? "./build" : "./public"

let files: Array<string> = []

if (process.env.NODE_ENV === "production") {
	fs.readdir(buildPath, (err, fls) => {
		if (err) console.error(err)
		else files = [...fls]
	})
}

const noCacheFiles = ["service-worker.js", "asset-manifest.json"]

function fileRouter(app: Express) {
	app.route("/static/*file").get((req: ExpressRequestType, res: ExpressResponseType) => {
		setCacheHeader({res, cache: "public, max-age=2592000, immutable"})
		res.sendFile(path.resolve(`${buildPath}/${req._parsedUrl?.pathname}`))
	})

	app.route("/media/*file").get((req: ExpressRequestType, res: ExpressResponseType) => {
		setCacheHeader({res, cache: "public, max-age=2592000, immutable"})
		res.sendFile(path.resolve(`${devPublicOrProductionBuildPath}/${req._parsedUrl?.pathname}`))
	})

	app.route("/.well-known/*file").get((req: ExpressRequestType, res: ExpressResponseType) => {
		setCacheHeader({res, cache: "public, max-age=2592000, immutable"})
		res.sendFile(path.resolve(`${buildPath}/env-files/${ENV_CONSTANT}${req._parsedUrl?.pathname.replace(".well-known", "well-known")}`))
	})

	app.route("/:file").get((req: ExpressRequestType, res: ExpressResponseType, next: NextFunction) => {
		const {file} = req.params
		if (process.env.NODE_ENV === "production") {
			if (typeof file === "string" && files.indexOf(file) !== -1) {
				const shouldNotCache = noCacheFiles.indexOf(file) !== -1
				setCacheHeader({
					res,
					cache: shouldNotCache ? "max-age=0" : "public, max-age=604800, stale-while-revalidate=86400",
				})
				res.sendFile(path.resolve(`${buildPath}/${file}`))
			} else {
				next()
			}
		} else {
			const filePath = `${buildPath}/${file}`
			const filePublicPath = `${devPublicOrProductionBuildPath}/${file}`
			if (fs.existsSync(filePath)) {
				res.sendFile(path.resolve(filePath))
			} else if (fs.existsSync(filePublicPath)) {
				res.sendFile(path.resolve(filePublicPath))
			} else {
				next()
			}
		}
	})
}

export default fileRouter
