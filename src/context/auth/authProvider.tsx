import type {AuthActionType, AuthStateType} from "context/auth/AuthType"
import authActions from "context/auth/authActions"
import authReducer, {authInit} from "context/auth/authReducer"
import nothing from "helpers/general/nothing"
import resetDataManager from "helpers/storage/resetDataManager"
import {createContext, type Dispatch, type ReactNode, useEffect, useLayoutEffect, useReducer, useRef} from "react"

// @ts-expect-error
export const authContext = createContext<{authState: AuthStateType; authDispatch: Dispatch<AuthActionType>}>(null)

function AuthProvider({children}: {children: ReactNode}) {
	const [authState, authDispatch] = useReducer(authReducer, authInit({isReset: false}))
	const cancelToken = useRef<AbortController>(null)
	const isLoggedIn = !!authState.user

	useEffect(() => {
		if (isLoggedIn) {
			authActions.getProfile({authDispatch, cancelToken}).catch(nothing)
		}
	}, [])

	useLayoutEffect(() => {
		window.authState = authState
		window.authDispatch = authDispatch
	}, [authState])

	useEffect(() => {
		function onResetData({detail: {isAfterLogin}}: {detail: {isAfterLogin: boolean}}) {
			cancelToken?.current?.abort?.("CANCEL")
			authDispatch({type: "RESET_DATA", payload: {isAfterLogin}})
		}

		resetDataManager.setResetDataListener({callBack: onResetData})
	}, [])

	return <authContext.Provider value={{authState, authDispatch}}>{children}</authContext.Provider>
}

export default AuthProvider
