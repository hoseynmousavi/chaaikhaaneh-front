import authActions from "context/auth/authActions"
import resetDataManager from "helpers/storage/resetDataManager"
import type {RefObject} from "react"
import refreshTokenManager, {type RefreshTokenProps} from "request/refreshTokenManager"

let isRefreshing = false

function checkIsRefreshing() {
	return isRefreshing
}

function goForRefresh(): Promise<void> {
	if (!isRefreshing) {
		isRefreshing = true
		return new Promise((resolve, reject) => {
			authActions
				.refreshToken()
				.then(() => {
					setTimeout(() => {
						resolve()
						refreshTokenManager.refreshToken({status: "OK"})
						isRefreshing = false
					}, 100)
				})
				.catch(err => {
					resetDataManager.resetData({isAfterLogin: false})
					setTimeout(() => {
						reject(err)
						refreshTokenManager.refreshToken({status: "NOK"})
						isRefreshing = false
					}, 100)
				})
		})
	} else {
		return handleWaitRefresh()
	}
}

function handleWaitRefresh({cancelToken}: {cancelToken?: RefObject<AbortController | null>} = {}): Promise<void> {
	return new Promise((resolve, reject): void => {
		if (cancelToken) {
			cancelToken.current = {
				// @ts-expect-error - ok
				signal: undefined,
				abort: () => {
					reject({isCancel: true})
					removeEventListener?.()
				},
			}
		}

		function callback({detail}: CustomEventInit<RefreshTokenProps>) {
			const status = detail?.status
			if (status === "OK") resolve()
			else reject({isCancel: false})
			removeEventListener?.()
		}

		const removeEventListener = refreshTokenManager.subscribeRefreshToken({callback})
	})
}

const handleRefreshingRequests = {checkIsRefreshing, goForRefresh, handleWaitRefresh}

export default handleRefreshingRequests
