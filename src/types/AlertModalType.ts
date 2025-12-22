import type {ButtonDesktopType} from "types/ButtonType"
import type {ComponentAsPropsType} from "types/ComponentAsPropsType"

export interface AlertModalType {
	Icon?: ComponentAsPropsType
	submitType?: ButtonDesktopType
	title: string
	desc?: string
	submitText: string
	cancelText?: string
	onSubmit: () => void
}
