import type {CSSProperties, MouseEventHandler, RefObject, TouchEventHandler} from "react"

export type ImageLoadingPropertyType = "lazy" | "eager"

export interface ImageResizeType {
	size: number | null
	aspectRatio: number | null
	isHeight?: boolean
	blur?: number
	placeholder?: string
}

export type ImagePreloadType = "mobile" | "desktop" | "all"

export type ImageSrcType = string | undefined

export interface BaseImageType {
	className?: string
	style?: CSSProperties
	src?: ImageSrcType
	resize: ImageResizeType
	alt?: string
	preload?: ImagePreloadType
	loading?: ImageLoadingPropertyType
	onClick?: MouseEventHandler<HTMLImageElement>
	onMouseEnter?: MouseEventHandler<HTMLImageElement>
	onMouseLeave?: MouseEventHandler<HTMLImageElement>
	onMouseDown?: MouseEventHandler<HTMLImageElement>
	onTouchStart?: TouchEventHandler<HTMLImageElement>
	onTouchMove?: TouchEventHandler<HTMLImageElement>
	onTouchEnd?: TouchEventHandler<HTMLImageElement>
	zoomOnClick?: boolean
	contRef?: RefObject<HTMLImageElement | null>
}

export interface BaseImageTypeWithDesktop extends BaseImageType {
	src: ImageSrcType
	desktopSrc: ImageSrcType
	desktopResize: ImageResizeType
	pictureClassName?: string
}
