import IMAGES from "constant/images/IMAGES"
import type {ImageResizeType, ImageSrcType} from "types/ImageType"

interface Props {
	src?: ImageSrcType
	resize: ImageResizeType
}

function getResizedImage({src, resize: {placeholder = IMAGES.placeholders.default, size = 300, isHeight = false, blur, aspectRatio}}: Props) {
	const multiple = 2
	let sizedImage = placeholder

	if (src) {
		if (!src?.endsWith?.(".svg") && size) {
			const key = isHeight ? "h" : "w"
			const multipleValue = Math.floor(size * multiple)
			const oppositeKey = !isHeight ? "h" : "w"
			const oppositeValue = aspectRatio ? Math.floor(oppositeKey === "h" ? multipleValue / aspectRatio : aspectRatio * multipleValue) : ""
			sizedImage = `${src}?x-img=v1/format,type_webp,lossless_false/resize,${key}_${multipleValue}${oppositeValue ? `,${oppositeKey}_${oppositeValue}` : ""}`
			if (blur) sizedImage += `/blur,sigma_${blur}`
		} else {
			sizedImage = src
		}
	}

	return {sizedImage, placeholder}
}

export default getResizedImage
