import type {FocusEventHandler, MouseEventHandler, ReactNode, RefObject} from "react"
import type {ComponentAsPropsType} from "types/ComponentAsPropsType"

export type InputValidationType = "phone" | "email" | "url" | "username" | "number"
export type InputKeyboardType = "text" | "number" | "password" | "tel" | "url" | "email" | "search"
export type InputKeyboardInputMode = "none" | "text" | "numeric" | "decimal" | "tel" | "email" | "url" | "search"
export type InputKeyHintType = "enter" | "done" | "go" | "next" | "previous" | "search" | "send"

export interface InputImperativeRef {
	onChange?: ({value}: {value: string}) => void
	blur?: () => void
	focus?: () => void
}

export interface InputChangeInputType {
	target: {value: string}
	isCalledByParent?: boolean
}

export interface InputChangeOutputType {
	value: string
	errorValue: string
	hasError: boolean
	name: string
	isCalledByParent: boolean
}

export interface InputType {
	name: string
	className?: string
	label?: string | ReactNode
	Icon?: ComponentAsPropsType
	EndIcon?: ComponentAsPropsType
	EndIconClassName?: string
	onEndIconClick?: () => void
	showClear?: boolean
	validation?: InputValidationType
	ltr?: boolean
	ltrFont?: boolean
	ref?: RefObject<InputImperativeRef>
	defaultValue?: string | null
	parentError?: string
	parentSuccess?: string
	onClick?: MouseEventHandler<HTMLInputElement>
	onChange: (props: InputChangeOutputType) => void
	focusOnMountDesktop?: boolean
	onSubmit?: () => void
	onSubmitDisable?: () => void
	disableSubmit?: boolean
	type?: InputKeyboardType
	inputMode?: InputKeyboardInputMode
	enterKeyHint?: InputKeyHintType
	isDisable?: boolean
	minLength?: number
	maxLength?: number
	placeholder?: string
	autoComplete?: "on" | "off"
	autoCapitalize?: "on" | "off" | "characters" | "words"
	onBlur?: () => void
	onFocus?: FocusEventHandler<HTMLInputElement>
	dontShowError?: boolean
	size?: "small" | "medium" | "large" | "x-large"
	isAutoDir?: boolean
	isArea?: boolean
	areaMaxHeight?: number
	areaMinHeight?: number
}
