import LOCAL_STORAGE_VALUES from "constant/storage/LOCAL_STORAGE_VALUES"
import type {AuthActionType, AuthStateType} from "context/auth/AuthType"
import clearLocalStorage from "helpers/storage/clearLocalStorage"

const authInitialState: AuthStateType = {user: null}

export function authInit({isReset}: {isReset: boolean}) {
	if (isReset) {
		return authInitialState
	} else {
		if (typeof window !== "undefined") {
			const token = localStorage.getItem(LOCAL_STORAGE_VALUES.ACCOUNT.token)
			const refresh_token = localStorage.getItem(LOCAL_STORAGE_VALUES.ACCOUNT.refresh_token)
			const user = localStorage.getItem(LOCAL_STORAGE_VALUES.ACCOUNT.user)
			if (token && refresh_token && user) {
				try {
					return {...authInitialState, user: JSON.parse(user)}
				} catch (_) {
					return authInitialState
				}
			} else {
				return authInitialState
			}
		} else {
			return authInitialState
		}
	}
}

function authReducer(state: AuthStateType = authInitialState, action: AuthActionType): AuthStateType {
	switch (action.type) {
		case "SET_USER": {
			const {user} = action.payload
			return {...state, user}
		}
		case "RESET_DATA": {
			const {isAfterLogin} = action.payload
			clearLocalStorage({
				exceptKeys: isAfterLogin ? [...Object.values(LOCAL_STORAGE_VALUES.ACCOUNT), ...Object.values(LOCAL_STORAGE_VALUES.DEVICE)] : Object.values(LOCAL_STORAGE_VALUES.DEVICE),
			})
			return isAfterLogin ? state : authInit({isReset: true})
		}
		default: {
			throw new Error()
		}
	}
}

export default authReducer
