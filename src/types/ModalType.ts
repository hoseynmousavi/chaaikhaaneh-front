import type {ReactNode, RefObject} from "react"

export interface ModalImperativeRef {
	desktopClose?: () => void
	mobileClose?: () => void
}

export type ModalAnchorOrigin = "top end" | "top start" | "bottom end" | "bottom start"

export interface DesktopModalType {
	children: ReactNode
	className?: string
	backClassName?: string
	close: () => void
	disableClose?: boolean
	root?: HTMLElement | null
	ref: RefObject<ModalImperativeRef>
	anchorRef?: RefObject<HTMLElement | null>
	anchorOrigin?: ModalAnchorOrigin
}

export interface MobileModalType extends DesktopModalType {
	mobileRootClassName?: string
}

export interface ModalType extends Omit<MobileModalType, "ref"> {
	statusBarColor?: string
	justDesktopView?: boolean
	desktopRoot?: HTMLElement | null
	mobileRoot?: HTMLElement | null
}
