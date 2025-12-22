import type {ComponentAsPropsType} from "types/ComponentAsPropsType"

export type ToastModeType = "SUCCESS" | "FAIL" | "INFO" | "WARNING"

export interface ToastType {
	message: string
	description?: string
	type?: ToastModeType
	onClick?: () => void
	haveClose?: boolean
	Icon?: ComponentAsPropsType
	removeOnChangeLocation?: boolean
}

export interface CreatedToastType extends ToastType {
	id: string
	type: ToastModeType
	haveClose: boolean
	removeOnChangeLocation: boolean
}

export interface HTMLDivElementWithClear {
	clearItem: () => void
	el: HTMLDivElement
}

export default ToastType
