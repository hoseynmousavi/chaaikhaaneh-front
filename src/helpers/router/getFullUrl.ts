import {serverReq} from "ContextWrapper"

function getFullUrl() {
	const pathUrl = typeof window !== "undefined" ? window.location.pathname : serverReq._parsedUrl?.pathname || ""
	const searchUrl = typeof window !== "undefined" ? window.location.search : serverReq._parsedUrl?.search || ""
	const fullUrl = pathUrl + searchUrl
	const fullUrlWithDomain = typeof window !== "undefined" ? window.location.href : process.env.REACT_APP_DOMAIN_URL + serverReq.originalUrl
	return {pathUrl, searchUrl, fullUrl, fullUrlWithDomain}
}

export default getFullUrl
