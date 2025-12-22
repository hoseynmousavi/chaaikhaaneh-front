import type {Express} from "express"
import type {ExpressResponseType} from "types/ExpressResponseType"

function liveNessRouter(app: Express) {
	app.route("/is-live").get((_, res: ExpressResponseType) => {
		res.sendStatus(200)
	})
}

export default liveNessRouter
