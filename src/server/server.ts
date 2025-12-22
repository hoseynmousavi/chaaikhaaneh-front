import * as Sentry from "@sentry/bun"
import URLS from "constant/routing/URLS"
import express from "express"
import {ENV_CONSTANT} from "helpers/general/ENV_CONSTANT"
import {createClient} from "redis"
import addRoutes from "server/helpers/addRoutes"
import createMockRedis from "server/helpers/createMockRedis"
import sendCsrHtml from "server/helpers/sendCsrHtml"
import redirectTrailingSlash from "server/middlewares/redirectTrailingSlash"
import envFileRouter from "server/routers/envFileRouter"
import fileRouter from "server/routers/fileRouter"
import liveNessRouter from "server/routers/liveNessRouter"
import manifestFileRouter from "server/routers/manifestFileRouter"
import type {ExpressRequestType} from "types/ExpressRequestType"

if (process.env.NODE_ENV === "production") {
	if (process.env.SENTRY_DSN) {
		Sentry.init({dsn: process.env.SENTRY_DSN, tracesSampleRate: 1.0, sampleRate: 1.0, environment: ENV_CONSTANT})
	} else {
		console.error("SENTRY_DSN not set")
	}
}

const app = express()

liveNessRouter(app)

// file routers
manifestFileRouter(app) // manifest.json base on env.
envFileRouter(app) // robots.txt etc.
fileRouter(app) // maybe file, maybe ignore

app.use((req: ExpressRequestType, _, next) => {
	// LOGS
	req.reqUUID = `${Math.floor(Math.random() * 1000) + 1000}`
	console.log(`${req.reqUUID}, got request on: ${req.originalUrl}`, new Date())
	// LOGS
	next()
})

// check trailing slash
app.use(redirectTrailingSlash())

addRoutes({app, SSR_ROUTES: {}, routeContainer: URLS})

app.route("*link").get((req, res) => sendCsrHtml({req, res, status: 404}))

if (process.env.MOCK_REDIS) {
	// @ts-expect-error - ok
	global.redisClient = createMockRedis()
	console.log("mock redis created")
} else if (process.env.REDIS_URL && process.env.REDIS_DB) {
	global.redisClient = createClient({url: process.env.REDIS_URL, password: process.env.REDIS_PASSWORD, database: +process.env.REDIS_DB})
	global.redisClient.on("error", err => console.error("redis client Error", err))
	global.redisClient
		.connect()
		.then(() => console.log("connected to redis successfully!"))
		.catch(err => console.error("connect to redis failed: ", err))
}

app.listen(process.env.SSR_PORT, error => {
	if (error) console.error(error)
	else console.log(`server is running on port ${process.env.SSR_PORT}`)
})
