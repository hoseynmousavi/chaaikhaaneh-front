import getFullUrl from "helpers/router/getFullUrl"
import manageHistory from "helpers/router/manageHistory"

function withRouter(WrappedComponent: any) {
	if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual"

	const pushState = window.history.pushState
	window.routerPushState = function () {
		const sameURL = decodeURIComponent(encodeURIComponent(getFullUrl().fullUrl)) === decodeURIComponent(encodeURIComponent(arguments[2]))
		if (!sameURL || arguments[0]?.data === "for-history") {
			// @ts-expect-error
			pushState.apply(this.history, arguments)
			const event = new Event("pushstate")
			window.dispatchEvent(event)
		} else if (sameURL) {
			window.scrollTo({top: 0, behavior: "smooth"})
		}
	}

	const replaceState = window.history.replaceState
	window.routerReplaceState = function () {
		const sameURL = decodeURIComponent(encodeURIComponent(getFullUrl().fullUrl)) === decodeURIComponent(encodeURIComponent(arguments[2]))
		if (!sameURL || arguments[0]?.data === "for-history") {
			// @ts-expect-error
			replaceState.apply(this.history, arguments)
			const event = new Event("replacestate")
			window.dispatchEvent(event)
		} else if (sameURL) {
			window.scrollTo({top: 0, behavior: "smooth"})
		}
	}

	manageHistory()

	return () => <WrappedComponent />
}

export default withRouter
