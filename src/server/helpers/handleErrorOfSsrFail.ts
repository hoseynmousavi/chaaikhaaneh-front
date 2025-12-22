import sendCsrHtml from "server/helpers/sendCsrHtml"
import type {ExpressRequestType} from "types/ExpressRequestType"
import type {ExpressResponseType} from "types/ExpressResponseType"

function handleErrorOfSsrFail({err, req, res}: {err: Error; req: ExpressRequestType; res: ExpressResponseType}) {
	const status = "status" in err && typeof err.status === "number" ? err.status : 500
	console.error(status === 500 ? "error in ssr" : "got ssr req on a 404 request", {msg: err?.message ?? "", url: req.originalUrl})
	sendCsrHtml({req, res, status})
}

export default handleErrorOfSsrFail
