import path from "node:path"
import type {Express} from "express"
import {ENV_CONSTANT} from "helpers/general/ENV_CONSTANT"
import setCacheHeader from "server/helpers/setCacheHeader"
import type {ExpressRequestType} from "types/ExpressRequestType"
import type {ExpressResponseType} from "types/ExpressResponseType"

const srcPath = process.env.NODE_ENV === "production" ? "./build" : "./public"

const envFiles = [
	{routePath: "/robots.txt", cache: "max-age=0"},
	{routePath: "/.well-known/assetlinks.json", cache: "max-age=0"},

	{routePath: "/favicon.ico", cache: "public, max-age=604800, stale-while-revalidate=86400"},
	{routePath: "/icon_128.png", cache: "public, max-age=604800, stale-while-revalidate=86400"},
	{routePath: "/icon_180.png", cache: "public, max-age=604800, stale-while-revalidate=86400"},
	{routePath: "/icon_192.png", cache: "public, max-age=604800, stale-while-revalidate=86400"},
	{routePath: "/icon_512.png", cache: "public, max-age=604800, stale-while-revalidate=86400"},
	{routePath: "/icon_maskable_128.png", cache: "public, max-age=604800, stale-while-revalidate=86400"},
	{routePath: "/icon_maskable_192.png", cache: "public, max-age=604800, stale-while-revalidate=86400"},
	{routePath: "/icon_maskable_512.png", cache: "public, max-age=604800, stale-while-revalidate=86400"},

	{routePath: "/sitemap.xml", cache: "max-age=0"},
]

function envFileRouter(app: Express) {
	envFiles.forEach(({routePath, cache}) => {
		app.route(routePath).get((req: ExpressRequestType, res: ExpressResponseType) => {
			setCacheHeader({res, cache})
			res.sendFile(path.resolve(`${srcPath}/env-files/${ENV_CONSTANT}${req._parsedUrl?.pathname?.replace(".well-known", "well-known")}`))
		})
	})
}

export default envFileRouter
