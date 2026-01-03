import authActions from "context/auth/authActions"
import {authContext} from "context/auth/authProvider"
import {use} from "react"

function useLogin() {
	const {authDispatch} = use(authContext)

	function login({username, password}: {username: string; password: string}) {
		return authActions.login({username, password, authDispatch})
	}

	return {login}
}

export default useLogin
