import LOCAL_STORAGE_VALUES from "constant/storage/LOCAL_STORAGE_VALUES"
import getErrorMessage from "helpers/error/getErrorMessage"
import getToastConstant from "helpers/general/getToastConstant"
import clearLocalStorage from "helpers/storage/clearLocalStorage"
import toastManager from "helpers/theme/toastManager"
import cancelMaker from "request/cancelMaker"
import getToken from "request/getToken"
import handleOnGoingRequests from "request/handleOnGoingRequests"
import handleRefreshingRequests from "request/handleRefreshingRequests"
import headerMaker from "request/headerMaker"
import onUploadProgress from "request/onUploadProgress"
import urlMaker from "request/urlMaker"
import type {getByNetworkProps, RequestDelType, RequestErrorType, RequestGetType, RequestPatchType, RequestPostType, RequestUploadAxiosType} from "types/RequestTypes"

function getByNetwork({reqUrl, dontToast, cancelToken, priority}: getByNetworkProps) {
	return fetch(reqUrl, {headers: headerMaker(), signal: cancelMaker({cancelToken}), priority})
		.then(res => {
			const contentType = res.headers.get("content-type")
			const isJson = !!(contentType && contentType.indexOf("application/json") !== -1)
			return res[isJson ? "json" : "text"]().then(data => {
				if (res.ok) {
					handleOnGoingRequests.broadCastIfNeeded({reqUrl, data, isOk: true})
					if (typeof window === "undefined") {
						if (global.redisClient) {
							global.redisClient
								.set(
									reqUrl,
									JSON.stringify({data, expiredAt: Date.now() + 120 * 1000}),
									{EX: 5184000}, // 60 days in seconds
								)
								.catch((err: Error) => console.error("write to redis failed: ", err))
						}
					} else {
						try {
							localStorage.setItem(reqUrl, JSON.stringify(data))
						} catch (_) {
							console.log("localStorage write err")
							clearLocalStorage({exceptKeys: [...Object.values(LOCAL_STORAGE_VALUES.ACCOUNT), ...Object.values(LOCAL_STORAGE_VALUES.DEVICE)]})
						}
					}
					return data
				} else {
					if (global.redisClient && res.status >= 400 && res.status < 500) {
						global.redisClient.del(reqUrl).catch((err: Error) => console.error("deleting redis failed: ", err))
					}

					return _serverErrorHandler({status: res.status, data, callback: () => getByNetwork(arguments[0])})
				}
			})
		})
		.catch(err => {
			return _networkErrorHandler({err, dontToast, getUrl: reqUrl})
		})
}

function get({url, subdomain, params, cancelToken, dontToast, ignoreRedis, priority}: RequestGetType): Promise<any> {
	const reqUrl = urlMaker({url, params, subdomain})
	if (global.redisClient && !ignoreRedis) {
		return global.redisClient
			.get(reqUrl)
			.then(record => {
				if (record) {
					const {data, expiredAt} = JSON.parse(record)
					if (Date.now() > expiredAt) {
						get({...arguments[0], ignoreRedis: true})
							.then(() => console.log("redis updated data for:", reqUrl))
							.catch(() => console.error("redis failed to update data for:", reqUrl))
					}
					return data
				} else {
					return get({...arguments[0], ignoreRedis: true})
				}
			})
			.catch((err: Error) => {
				if (typeof err === "object" && "status" in err) {
					// if network request failed
					throw err
				} else {
					// if redis failed
					console.error("redis get error: ", err, err.message)
					return get({...arguments[0], ignoreRedis: true})
				}
			})
	} else if (handleRefreshingRequests.checkIsRefreshing()) {
		return handleRefreshingRequests
			.handleWaitRefresh({cancelToken})
			.then(() => get(arguments[0]))
			.catch(err => {
				if (err?.isCancel) {
					throw "CANCEL"
				} else {
					return get(arguments[0])
				}
			})
	} else if (handleOnGoingRequests.checkRepeating({reqUrl})) {
		return handleOnGoingRequests.handleRepeat({reqUrl})
	} else {
		return getByNetwork({reqUrl, dontToast, cancelToken, priority})
	}
}

function post({url, subdomain, data, params, cancelToken, dontToast, priority}: RequestPostType) {
	const reqUrl = urlMaker({url, params, subdomain})
	const isURLSearchParams = data instanceof URLSearchParams
	const isFormData = data instanceof FormData
	return fetch(reqUrl, {
		method: "POST",
		body: isURLSearchParams || isFormData ? data : JSON.stringify(data),
		headers: headerMaker({headers: {...(!isFormData && !isURLSearchParams ? {"content-type": "application/json"} : {})}}),
		signal: cancelMaker({cancelToken}),
		priority,
	})
		.then(res => {
			const contentType = res.headers.get("content-type")
			const isJson = !!(contentType && contentType.indexOf("application/json") !== -1)
			return res[isJson ? "json" : "text"]().then(data => {
				if (res.ok) {
					return data
				} else {
					return _serverErrorHandler({data, status: res.status, callback: () => post(arguments[0])})
				}
			})
		})
		.catch(err => {
			return _networkErrorHandler({err, dontToast})
		})
}

function patch({url, subdomain, data, params, cancelToken, dontToast, priority}: RequestPatchType) {
	const reqUrl = urlMaker({url, params, subdomain})
	const isURLSearchParams = data instanceof URLSearchParams
	const isFormData = data instanceof FormData
	return fetch(reqUrl, {
		method: "PATCH",
		body: isURLSearchParams || isFormData ? data : JSON.stringify(data),
		headers: headerMaker({headers: {...(!isFormData && !isURLSearchParams ? {"content-type": "application/json"} : {})}}),
		signal: cancelMaker({cancelToken}),
		priority,
	})
		.then(res => {
			const contentType = res.headers.get("content-type")
			const isJson = !!(contentType && contentType.indexOf("application/json") !== -1)
			return res[isJson ? "json" : "text"]().then(data => {
				if (res.ok) {
					return data
				} else {
					return _serverErrorHandler({data, status: res.status, callback: () => patch(arguments[0])})
				}
			})
		})
		.catch(err => {
			return _networkErrorHandler({err, dontToast})
		})
}

function del({url, subdomain, params, cancelToken, dontToast, priority}: RequestDelType) {
	const reqUrl = urlMaker({url, params, subdomain})
	return fetch(reqUrl, {method: "DELETE", headers: headerMaker(), signal: cancelMaker({cancelToken}), priority})
		.then(res => {
			const contentType = res.headers.get("content-type")
			const isJson = !!(contentType && contentType.indexOf("application/json") !== -1)
			return res[isJson ? "json" : "text"]().then(data => {
				if (res.ok) {
					return data
				} else {
					return _serverErrorHandler({data, status: res.status, callback: () => del(arguments[0])})
				}
			})
		})
		.catch(err => {
			return _networkErrorHandler({err, dontToast})
		})
}

function _serverErrorHandler({data, status, callback}: RequestErrorType) {
	const refresh_token = getToken({useRefreshToken: true})
	if (status === 401 && "code" in data && data.code === "token_not_valid" && refresh_token) {
		return handleRefreshingRequests.goForRefresh().then(callback)
	} else {
		throw {status, data}
	}
}

function _networkErrorHandler({err, dontToast, getUrl}: {err: any; dontToast?: boolean; getUrl?: string}) {
	if (err !== "CANCEL" && err?.code !== "ERR_CANCELED" && !err?.toString()?.includes?.("abort")) {
		if (err?.status !== 404) {
			console.error(err)
		}

		const isServerErr = typeof err === "object" && "status" in err

		if (isServerErr) {
			if (typeof window !== "undefined" && !dontToast) {
				toastManager.addToast({message: getErrorMessage({status: err?.status, data: err?.data}), type: "FAIL"})
			}
		} else {
			let data = !!getUrl && typeof localStorage !== "undefined" && localStorage.getItem(getUrl)
			if (data) {
				try {
					data = JSON.parse(data)
					if (getUrl) handleOnGoingRequests.broadCastIfNeeded({reqUrl: getUrl, data, isOk: true})
					return data
				} catch (e: any) {
					console.log(e?.message)
					if (getUrl) localStorage.removeItem(getUrl)
					throw err
				}
			} else {
				if (typeof window !== "undefined" && !dontToast) {
					const toastConstant = getToastConstant()
					toastManager.addToast({message: toastConstant.networkError, type: "FAIL"})
				}
			}
		}
	}

	if (getUrl) handleOnGoingRequests.broadCastIfNeeded({reqUrl: getUrl, data: err, isOk: false})
	throw err
}

function uploadAxios({method, url, subdomain, data, params, progress, cancelToken, dontToast}: RequestUploadAxiosType) {
	return import("axios").then(axios => {
		const reqUrl = urlMaker({url, params, subdomain})
		return axios.default[method](reqUrl, data, {headers: headerMaker(), signal: cancelMaker({cancelToken}), onUploadProgress: onUploadProgress({progress})})
			.then(res => res.data)
			.catch(err => {
				if (err?.response?.status) {
					return _serverErrorHandler({status: err?.response?.status, data: err?.response?.data, callback: () => uploadAxios(arguments[0])})
				} else {
					return _networkErrorHandler({err, dontToast})
				}
			})
	})
}

const request = {get, post, patch, del, uploadAxios}

export default request
