export interface UserType {
	nickname: string
	mobile_number: string
	avatar: string | null
	slug: string
}

export interface UpdateUserType extends Omit<UserType, "avatar" | "mobile_number"> {
	avatar: File
}

export interface AuthStateType {
	user: null | UserType
}

export interface SetUserActionType {
	type: "SET_USER"
	payload: {user: UserType}
}

export interface ResetDataActionType {
	type: "RESET_DATA"
	payload: {isAfterLogin: boolean}
}

export type AuthActionType = SetUserActionType | ResetDataActionType
