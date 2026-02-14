import type {CSSProperties, MouseEventHandler, ReactNode, RefObject} from "react"
import type LinkType from "types/LinkType"

export interface useButtonHoverTipType {
	hoverTip?: string
	btnRef?: RefObject<HTMLButtonElement | null>
	onMouseEnter?: MouseEventHandler
	onMouseLeave?: MouseEventHandler
}

type btnType =
	| "primary"
	| "error"
	| "info"
	| "on-surface-first"
	| "success"
	| "ghost-primary"
	| "ghost-info"
	| "ghost-error"
	| "ghost-on-surface-first"
	| "ghost-outline-second"
	| "ghost-white"
	| "outline-second-on-surface-first"
	| "outline-white"
	| "surface-third-outline-third-on-surface-first"
	| "surface-third-outline-second-on-surface-first-icon-third"
	| "surface-second-on-surface-first"
	| "surface-fourth-outline-second-on-surface-first"

export type ButtonMobileType = btnType

export type ButtonDesktopType = btnType

export type ButtonSizeType = "x-large" | "large" | "medium" | "small" | "x-small"

export interface ButtonType extends useButtonHoverTipType {
	mobileType?: ButtonMobileType
	desktopType?: ButtonDesktopType
	desktopIsFullWidth?: boolean
	mobileIsFullWidth?: boolean
	desktopSize?: ButtonSizeType
	mobileSize?: ButtonSizeType
	desktopIsSquare?: boolean
	mobileIsSquare?: boolean
	desktopIsRounded?: boolean
	mobileIsRounded?: boolean
	isLoading?: boolean
	btnContentLoading?: boolean
	isDisable?: boolean
	className?: string
	style?: CSSProperties
	ariaLabel?: string
	children?: ReactNode
	link?: LinkType
	onClick?: MouseEventHandler | ((props: any) => void)
	onDisableClick?: MouseEventHandler | (() => void)
	rippleColor?: string
	disableRipple?: boolean
	isDiv?: boolean
	escapeStart?: boolean
	escapeEnd?: boolean
	escapeBlock?: boolean
}
