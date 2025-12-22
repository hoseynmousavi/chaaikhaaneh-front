import type {Request} from "express"
import type {ImagePreloadType, ImageSrcType} from "types/ImageType"

export interface ExpressRequestType extends Request {
	reqUUID?: string
	_parsedUrl?: {search: string | null; pathname: string}
	data?: {}
	svgs?: Record<string, string>
	metaTitle?: string
	metaDescription?: string
	metaImage?: string
	metaPreloadImgs?: Array<{src: ImageSrcType; preload: ImagePreloadType}>
}
