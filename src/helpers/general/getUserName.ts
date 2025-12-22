import type {UserType} from "context/auth/AuthType"
import getIranPhone from "helpers/auth/getIranPhone"

interface Props {
	user: UserType | null
}

function getUserName({user}: Props): string {
	const {nickname, mobile_number} = user || {}
	return nickname || (mobile_number ? getIranPhone(mobile_number) : "")
}

export default getUserName
