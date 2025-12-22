import COOKIE_VALUES from "constant/storage/COOKIE_VALUES"
import nothing from "helpers/general/nothing"
import cookieHelper from "helpers/storage/cookieHelper"
import handleRefreshingRequests from "request/handleRefreshingRequests"

function refreshTokenBeforeExpires() {
	const tokenExpiresIn: string = cookieHelper.getItem(COOKIE_VALUES.ACCOUNT.token_expires_in)
	if (tokenExpiresIn) {
		const tokenExpiresInDate: Date = new Date(tokenExpiresIn)
		clearTimeout(window.refreshTokenTimer)

		const diff: number = tokenExpiresInDate.getTime() - Date.now()
		if (diff > 0) {
			window.refreshTokenTimer = setTimeout(refresh, Math.max(0, diff - 1000))
		} else {
			refresh()
		}
	}
}

function refresh() {
	handleRefreshingRequests
		.goForRefresh()
		.then(() => {
			console.log("Token Refreshed")
		})
		.catch(nothing)
}

export default refreshTokenBeforeExpires
