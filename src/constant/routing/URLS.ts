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

			payment: "/payment",

			home: {
				entry: "/",
				routes: {
					homeDue: "/",

					homePayments: "/home-payments",
				},
			},
		},
	},
}

export default URLS
