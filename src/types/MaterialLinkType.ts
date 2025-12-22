import type {CSSProperties, MouseEventHandler, ReactNode, RefObject} from "react"
import type LinkType from "types/LinkType"

export interface useMaterialType {
	rippleColor?: string
	ref?: RefObject<HTMLButtonElement | null>
	isDisable?: boolean
	disableRipple?: boolean
	onDisableClick?: MouseEventHandler
	onClick?: MouseEventHandler
	link?: LinkType
}

export interface MaterialLinkType extends useMaterialType {
	children: ReactNode
	isDiv?: boolean
	isLabel?: boolean
	className?: string
	style?: CSSProperties
	ariaLabel?: string
	onMouseEnter?: MouseEventHandler
	onMouseLeave?: MouseEventHandler
}
