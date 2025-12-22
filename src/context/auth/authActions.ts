import API_URLS from "constant/routing/API_URLS"
import LOCAL_STORAGE_VALUES from "constant/storage/LOCAL_STORAGE_VALUES"
import type {SetUserActionType, UpdateUserType, UserType} from "context/auth/AuthType"
import refreshTokenBeforeExpires from "helpers/auth/refreshTokenBeforeExpires"
import getToastConstant from "helpers/general/getToastConstant"
import resetDataManager from "helpers/storage/resetDataManager"
import toastManager from "helpers/theme/toastManager"
import type {Dispatch, RefObject} from "react"
import getToken from "request/getToken"
import request from "request/request"

function getProfile({authDispatch, cancelToken}: {authDispatch: Dispatch<SetUserActionType>; cancelToken?: RefObject<AbortController | null>}) {
	return request.get({url: API_URLS.profile, cancelToken, dontToast: true}).then((user: UserType) => {
		setUser({data: {user}, authDispatch})
	})
}

function updateUser({
	data,
	progress,
	cancelToken,
	authDispatch,
}: {
	data: Partial<UpdateUserType>
	progress?: (progress: number) => void
	cancelToken?: RefObject<AbortController | null>
	authDispatch: Dispatch<SetUserActionType>
}) {
	const formData = new FormData()
	Object.entries(data).forEach(([key, value]) => {
		if (value !== null) formData.append(key, value)
	})
	return request.uploadAxios({method: "patch", progress, url: API_URLS.profile, data: formData, cancelToken}).then((user: UserType) => {
		setUser({data: {user}, authDispatch})
	})
}

function requestOtp({mobile_number, cancelToken}: {mobile_number: string; cancelToken?: RefObject<AbortController | null>}) {
	return request.post({url: API_URLS.requestOtp, data: {mobile_number}, cancelToken}).then(({ttl}: {ttl: number}) => {
		return ttl
	})
}

function verifyOtp({mobile_number, otp, cancelToken, authDispatch}: {mobile_number: string; otp: string; cancelToken?: RefObject<AbortController | null>; authDispatch: Dispatch<SetUserActionType>}) {
	return request
		.post({url: API_URLS.verifyOtp, data: {mobile_number, otp}, cancelToken})
		.then(({access_token, refresh_token, access_expires, user}: {access_token: string; refresh_token: string; access_expires: number; user: UserType}) => {
			_setCookies({access_token, refresh_token, access_expires})
			setUser({data: {user}, authDispatch})
			setTimeout(() => {
				resetDataManager.resetData({isAfterLogin: true})
				refreshTokenBeforeExpires()
			}, 100)
		})
}

function setUser({data: {user}, authDispatch}: {data: {user: UserType}; authDispatch: Dispatch<SetUserActionType>}) {
	localStorage.setItem(LOCAL_STORAGE_VALUES.ACCOUNT.user, JSON.stringify(user))
	authDispatch({type: "SET_USER", payload: {user}})
}

function _setCookies({access_token, refresh_token, access_expires}: {access_token: string; refresh_token?: string; access_expires: number}) {
	localStorage.setItem(LOCAL_STORAGE_VALUES.ACCOUNT.token, `Bearer ${access_token}`)
	if (refresh_token) localStorage.setItem(LOCAL_STORAGE_VALUES.ACCOUNT.refresh_token, refresh_token)
	localStorage.setItem(LOCAL_STORAGE_VALUES.ACCOUNT.token_expires_in, new Date(Date.now() + access_expires * 1000).toString())
}

function refreshToken() {
	const refresh = getToken({useRefreshToken: true})
	return new Promise((resolve, reject) => {
		request
			.post({data: {refresh}, url: API_URLS.refreshToken, dontToast: true})
			.then(({access: access_token, access_expires}: {access: string; access_expires: number}) => {
				// TODO should get "expires" here
				_setCookies({access_token, access_expires})
				refreshTokenBeforeExpires()
				resolve(null)
			})
			.catch(err => {
				const refreshError = err?.status === 401
				if (refreshError) {
					const toastConstant = getToastConstant()
					toastManager.addToast({message: toastConstant.refreshError, type: "INFO", removeOnChangeLocation: false})
					reject(err)
				} else {
					resolve(null)
				}
			})
	})
}

const authActions = {
	getProfile,
	updateUser,
	requestOtp,
	verifyOtp,
	refreshToken,
}

export default authActions
