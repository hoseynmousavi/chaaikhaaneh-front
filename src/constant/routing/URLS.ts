export interface UrlType {
	entry: string
	routes: {[key: string]: string | Function | UrlType}
}

export interface UrlsType {
	[key: string]: UrlType
}

const URLS = {
	mainContainer: {
		// order is important, please keep sync with the mainPageContainer
		entry: "*",
		routes: {
			entryForServiceWorker: "/index.html",

			login: "/login",

			home: {
				entry: "/",
				routes: {
					homeOverdue: "/",

					homePayments: "/payments",
				},
			},
		},
	},
}

export default URLS
