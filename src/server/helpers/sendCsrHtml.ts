import getMainCSS from "server/helpers/getMainCSS"
import getMainHtml from "server/helpers/getMainHtml"
import getMainJs from "server/helpers/getMainJs"
import setCacheHeader from "server/helpers/setCacheHeader"
import type {ExpressRequestType} from "types/ExpressRequestType"
import type {ExpressResponseType} from "types/ExpressResponseType"

interface Props {
	req: ExpressRequestType
	res: ExpressResponseType
	status: number
}

function sendCsrHtml({req, res, status}: Props) {
	if (!res.sent) {
		try {
			// LOGS
			console.log(`${req.reqUUID}, CSR ${status} respond: ${req.originalUrl}`, new Date())
			// LOGS

			setCacheHeader({res, cache: "max-age=0"})
			const {cssLink} = getMainCSS()
			const jsLink = getMainJs()
			const html = getMainHtml({jsLink, cssLink})
			res.status(status).send(html)
			res.sent = true
		} catch (e) {
			console.error("couldn't respond", e)
		}
	}
}

export default sendCsrHtml
