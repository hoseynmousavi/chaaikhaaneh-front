import type {UrlsType} from "constant/routing/URLS"
import type {Express} from "express"
import sendCsrHtml from "server/helpers/sendCsrHtml"

interface Props {
	app: Express
	SSR_ROUTES: Record<string, Function>
	routeContainer: UrlsType
}

function addRoutes({app, SSR_ROUTES, routeContainer}: Props) {
	for (const route of Object.values(routeContainer)) {
		const {routes} = route
		const routesKeysArr = Object.keys(routes)
		for (let i = 0; i < routesKeysArr.length; i++) {
			const key = routesKeysArr[i]
			const url = routes[key]

			if (typeof url === "string") {
				const ssrFunc = SSR_ROUTES[url]
				if (ssrFunc) {
					app.route(url).get((req, res) => ssrFunc(req, res))
				} else {
					app.route(url).get((req, res) => sendCsrHtml({req, res, status: 200}))
				}
			} else if (typeof url === "object" && url.routes) {
				addRoutes({app, SSR_ROUTES, routeContainer: {container: url}})
			}
		}
	}
}

export default addRoutes
