import authActions from "context/auth/authActions"
import {useState} from "react"

function useChangePassword() {
	const [isLoading, setIsLoading] = useState(false)

	function changePassword({old_password, new_password}: {old_password: string; new_password: string}) {
		setIsLoading(true)
		return authActions.changePassword({old_password, new_password}).finally(() => setIsLoading(false))
	}

	return {changePassword, isLoading}
}

export default useChangePassword
