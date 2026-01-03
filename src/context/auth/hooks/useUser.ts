import {authContext} from "context/auth/authProvider"
import {use} from "react"

function useUser() {
	const {authState, authDispatch} = use(authContext) || {}
	const {user} = authState || {}
	const isLoggedIn = !!user
	return {user, isLoggedIn, authDispatch}
}

export default useUser
