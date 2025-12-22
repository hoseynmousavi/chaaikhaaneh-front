import type {NextFunction} from "express"
import setCacheHeader from "server/helpers/setCacheHeader"
import type {ExpressRequestType} from "types/ExpressRequestType"
import type {ExpressResponseType} from "types/ExpressResponseType"

function redirectTrailingSlash() {
	return (req: ExpressRequestType, res: ExpressResponseType, next: NextFunction) => {
		const {originalUrl} = req
		if (originalUrl.length > 1 && originalUrl.endsWith("/")) {
			const domain = process.env.REACT_APP_DOMAIN_URL
			setCacheHeader({res, cache: "max-age=1800"})
			if (domain) {
				res.redirect(301, domain + originalUrl.slice(0, originalUrl.length - 1))
			} else {
				next()
			}
		} else {
			next()
		}
	}
}

export default redirectTrailingSlash
