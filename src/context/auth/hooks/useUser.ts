import type {UpdateUserType} from "context/auth/AuthType"
import authActions from "context/auth/authActions"
import {authContext} from "context/auth/authProvider"
import toastManager from "helpers/theme/toastManager"
import {type RefObject, use} from "react"
import type {ToastModeType} from "types/ToastType"

interface UpdateUserProps {
	data: Partial<UpdateUserType>
	toastMessage: string
	dontToast?: boolean
	toastType?: ToastModeType
	progress?: (percent: number) => void
	cancelToken?: RefObject<AbortController | null>
}

function useUser() {
	const {authState, authDispatch} = use(authContext) || {}
	const {user} = authState || {}
	const isLoggedIn = !!user

	function updateUser({data, toastMessage, dontToast, toastType, progress, cancelToken}: UpdateUserProps) {
		return authActions.updateUser({data, progress, cancelToken, authDispatch}).then(() => {
			if (!dontToast) {
				toastManager.addToast({message: toastMessage, type: toastType})
			}
		})
	}

	return {user, isLoggedIn, updateUser, authDispatch}
}

export default useUser
