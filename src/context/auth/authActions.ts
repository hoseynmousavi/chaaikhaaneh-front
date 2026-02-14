import API_URLS from "constant/routing/API_URLS"
import LOCAL_STORAGE_VALUES from "constant/storage/LOCAL_STORAGE_VALUES"
import type {SetUserActionType, UserType} from "context/auth/AuthType"
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

function login({username, password, authDispatch}: {username: string; password: string; authDispatch: Dispatch<SetUserActionType>}) {
	return request.post({url: API_URLS.login, data: {username, password}}).then(({access, refresh, user}: {access: string; refresh: string; user: UserType}) => {
		_setCookies({access, refresh})
		setUser({data: {user}, authDispatch})
		setTimeout(() => {
			resetDataManager.resetData({isAfterLogin: true})
		}, 100)
	})
}

function setUser({data: {user}, authDispatch}: {data: {user: UserType}; authDispatch: Dispatch<SetUserActionType>}) {
	localStorage.setItem(LOCAL_STORAGE_VALUES.ACCOUNT.user, JSON.stringify(user))
	authDispatch({type: "SET_USER", payload: {user}})
}

function _setCookies({access, refresh}: {access: string; refresh?: string}) {
	localStorage.setItem(LOCAL_STORAGE_VALUES.ACCOUNT.token, `Bearer ${access}`)
	if (refresh) localStorage.setItem(LOCAL_STORAGE_VALUES.ACCOUNT.refresh_token, refresh)
}

function refreshToken() {
	const refresh = getToken({useRefreshToken: true})
	return new Promise((resolve, reject) => {
		request
			.post({data: {refresh}, url: API_URLS.refreshToken, dontToast: true})
			.then(({access}: {access: string}) => {
				_setCookies({access})
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

function changePassword({old_password, new_password}: {old_password: string; new_password: string}) {
	return request.patch({url: API_URLS.changePassword, data: {old_password, new_password, confirm_new_password: new_password}})
}

const authActions = {
	getProfile,
	login,
	refreshToken,
	changePassword,
}

export default authActions
