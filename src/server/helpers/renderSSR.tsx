import App from "App"
import ContextWrapper, {serverReq} from "ContextWrapper"
import {prerender} from "react-dom/static"
import getCriticalCss from "server/helpers/getCriticalCss"
import getMainCSS from "server/helpers/getMainCSS"
import getMainHtml from "server/helpers/getMainHtml"
import getMainJs from "server/helpers/getMainJs"
import sendCsrHtml from "server/helpers/sendCsrHtml"
import setCacheHeader from "server/helpers/setCacheHeader"
import type {ExpressRequestType} from "types/ExpressRequestType"
import type {ExpressResponseType} from "types/ExpressResponseType"

interface Props {
	req: ExpressRequestType
	res: ExpressResponseType
	data?: {}
	status: number
}

function renderSSR({req, res, data = {}, status}: Props) {
	req.data = {...req.data, ...data}
	_renderToString(req, res).then(renderedBody => {
		const {mainCSS, cssLink} = getMainCSS()
		const jsLink = getMainJs()

		getCriticalCss({renderedBody, mainCSS}).then(criticalCSS => {
			let html = getMainHtml({
				cssLink,
				jsLink,
				inlineCss: criticalCSS,
				metaTitle: serverReq.metaTitle,
				metaDescription: serverReq.metaDescription,
				metaImage: serverReq.metaImage,
				metaPreloadImgs: serverReq.metaPreloadImgs,
			})

			html = html
				.replace(`<div id="svg-container" style="display:none"></div>`, `<div id="svg-container" style="display: none">${Object.values(req.svgs || []).join("")}</div>`)
				.replace(`<div id="root"></div>`, `<div id="root">${renderedBody}</div><script id="server-data">window.serverData = ${JSON.stringify(req.data)}</script>`)

			if (!res.sent) {
				try {
					// LOGS
					console.log(`${req.reqUUID}, SSR ${status} respond: ${req.originalUrl}`, new Date())
					// LOGS

					setCacheHeader({res, cache: "max-age=0"})
					res.status(status).send(html)
					res.sent = true
				} catch (e) {
					console.error("couldn't respond", e)
				}
			}
		})
	})
}

async function _renderToString(req: ExpressRequestType, res: ExpressResponseType) {
	const {prelude} = await prerender(
		<ContextWrapper req={req}>
			<App />
		</ContextWrapper>,
		{onError: err => _onError(req, res, err)},
	)

	const reader = prelude.getReader()
	let content = ""
	while (true) {
		const {done, value} = await reader.read()
		if (done) {
			return content
		}
		content += Buffer.from(value).toString("utf8")
	}
}

function _onError(req: ExpressRequestType, res: ExpressResponseType, err?: any) {
	console.error("error on stream in renderToPipeableStream", err ?? "")
	if (process.env.NODE_ENV === "development") {
		if (!res.sent) {
			res.status(500).send("error on stream in renderToPipeableStream")
			res.sent = true
		}
	} else {
		// Sentry.captureException(err)
		sendCsrHtml({req, res, status: 500})
	}
}

export default renderSSR
