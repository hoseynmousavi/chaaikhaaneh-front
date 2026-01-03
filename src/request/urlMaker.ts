import {O_AUTH_SERVER_URL, SERVER_URL} from "constant/routing/SERVER_URL"
import createQueryString from "helpers/query-param/createQueryString"
import type {SubdomainType} from "types/RequestTypes"

function urlMaker({url, params, subdomain}: {url: string; params?: Record<string, string | number | null | Array<string>>; subdomain?: SubdomainType}) {
	return `${findBaseUrl(subdomain)}/${url}/${params ? createQueryString({params}) : ""}`
}

function findBaseUrl(subdomain?: SubdomainType) {
	switch (subdomain) {
		case "oAuth":
			return O_AUTH_SERVER_URL
		default:
			return process.env.API_BASE_URL || SERVER_URL
	}
}

export default urlMaker
