export interface UserType {
	id: string
	username: string
	name: string
	phone_number: string
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
