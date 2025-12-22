import type {ReactNode} from "react"
import type {ComponentAsPropsType} from "types/ComponentAsPropsType"
import type {InputValidationType} from "types/InputType"

export interface BaseField {
	name: string
	title: string
	isRequired: boolean
}

export interface TextField extends BaseField {
	type: "text"
	minLength?: number
	maxLength?: number
	validation?: InputValidationType
	placeholder?: string
	isLtr: boolean
	Icon?: ComponentAsPropsType
}

export interface AreaField extends BaseField {
	type: "area"
	minLength: number
	maxLength: number
	placeholder?: string
	isLtr: boolean
}

export interface ProfilePhotoField extends BaseField {
	type: "profile_photo"
}

export interface SelectionField extends BaseField {
	type: "selection"
	items: Array<{title: string; slug: string}>
}

export interface InputSuggestField extends BaseField {
	type: "input_select"
	hook: ({q}: {q: string}) => {
		data: Array<{slug: string; text: string}>
		results: {[slug: string]: {slug: string; text: string} | undefined}
		add: ({text}: {text: string}) => Promise<{text: string; slug: string}>
		isLoading: boolean
	}
	aiSuggestionHook: ({slug}: {slug: string | undefined}) => {data: Array<string>; isLoading: boolean}
	aiMetadata: string
}

export interface ProductPicturesField extends BaseField {
	type: "product_pictures"
	minLength: number
	maxLength: number
}

export interface PreviewFields extends BaseField {
	type: "preview"
	render: ReactNode
}

export type FormFieldType = TextField | AreaField | ProfilePhotoField | SelectionField | InputSuggestField | ProductPicturesField | PreviewFields
