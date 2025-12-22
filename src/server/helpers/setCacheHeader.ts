import ENVS from "constant/general/ENVS"
import {ENV_CONSTANT} from "helpers/general/ENV_CONSTANT"
import type {ExpressResponseType} from "types/ExpressResponseType"

function setCacheHeader({res, cache}: {res: ExpressResponseType; cache: string}) {
	if (process.env.NODE_ENV === "production" && ENV_CONSTANT === ENVS.PRODUCTION) {
		res.setHeader("Cache-Control", cache)
	} else {
		res.setHeader("Cache-Control", "private, no-store, max-age=0")
	}
}

export default setCacheHeader
