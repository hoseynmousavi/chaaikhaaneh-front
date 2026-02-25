import onPopState from "helpers/router/onPopState"
import router from "helpers/router/router"
import useResize from "hooks/general/useResize"
import useImageGesture from "hooks/image/useImageGesture"
import {type RefObject, useEffect, useRef, useState} from "react"
import {createPortal} from "react-dom"
import Image from "views/components/image/Image"

interface ImageZoomProps {
	imgRef: RefObject<HTMLImageElement | null>
	close: () => void
}

function ImageZoom({imgRef, close}: ImageZoomProps) {
	const [showRect, setShowRect] = useState<{
		src: string
		className: string
		top: number
		left: number
		width: number
		height: number
		borderRadius: string
		isHiding: boolean
	}>({
		src: "",
		className: "",
		top: 0,
		left: 0,
		width: 0,
		height: 0,
		borderRadius: "",
		isHiding: false,
	})
	const {src, className, top, left, width, height, borderRadius, isHiding} = showRect
	const {imageBackRef, imageRef, onTouchEnd, onTouchMove, onTouchStart} = useImageGesture()
	const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)
	const isBacking = useRef(false)

	useResize({resizeCallback})

	function resizeCallback() {
		setImgPosition()
	}

	useEffect(() => {
		if (imgRef.current?.src) {
			onPopState({callback: closeImage, statusBarColor: "#050909"})
			const {top, left, width, height} = imgRef.current.getBoundingClientRect()
			setShowRect({
				src: imgRef.current.currentSrc,
				className: imgRef.current.className,
				top,
				left,
				width,
				height,
				borderRadius: getComputedStyle(imgRef.current).getPropertyValue("border-radius"),
				isHiding: false,
			})
			setTimeout(setImgPosition, 50)
		} else {
			close()
		}
	}, [])

	function setImgPosition() {
		const ratio = 0.7
		if (debounceRef.current) clearTimeout(debounceRef.current)
		debounceRef.current = setTimeout(() => {
			if (imgRef.current) {
				if (imgRef.current.naturalWidth / imgRef.current.naturalHeight > window.innerWidth / window.innerHeight) {
					const fullWidth = window.innerWidth * ratio
					const fullHeight = (window.innerWidth / imgRef.current.naturalWidth) * imgRef.current.naturalHeight * ratio
					setShowRect(showRect => ({
						...showRect,
						top: (window.innerHeight - fullHeight) / 2,
						left: ((1 - ratio) / 2) * window.innerWidth,
						width: fullWidth,
						height: fullHeight,
						borderRadius: "var(--third-radius)",
						isHiding: false,
					}))
				} else {
					const fullWidth = (window.innerHeight / imgRef.current.naturalHeight) * imgRef.current.naturalWidth * ratio
					const fullHeight = window.innerHeight * ratio
					setShowRect(showRect => ({
						...showRect,
						top: ((1 - ratio) / 2) * window.innerHeight,
						left: (window.innerWidth - fullWidth) / 2,
						width: fullWidth,
						height: fullHeight,
						borderRadius: "var(--third-radius)",
						isHiding: false,
					}))
				}
			}
		}, 10)
	}

	function closeImage() {
		if (imgRef.current) {
			const {top, left, width, height} = imgRef.current.getBoundingClientRect()
			setShowRect(showRect => ({
				...showRect,
				top,
				left,
				width,
				height,
				borderRadius: imgRef.current ? getComputedStyle(imgRef.current).getPropertyValue("border-radius") : "",
				isHiding: true,
			}))
			setTimeout(close, 370)
		}
	}

	function goBackIfNotHiding() {
		if (!isBacking.current) {
			router.back()
			isBacking.current = true
		}
	}

	if (src) {
		return createPortal(
			<>
				{/** biome-ignore lint/a11y/noStaticElementInteractions: <ok> */}
				{/** biome-ignore lint/a11y/useKeyWithClickEvents: <ok> */}
				<div ref={imageBackRef} className={`modal-background ${isHiding ? "hide" : ""}`} onClick={goBackIfNotHiding} />
				<Image
					className={`${className} image-show-picture`}
					contRef={imageRef}
					style={{
						transition: "all var(--first-transition)",
						top: `${top}px`,
						left: `${left}px`,
						width: `${width}px`,
						height: `${height}px`,
						borderRadius: borderRadius,
					}}
					src={src}
					onMouseDown={onTouchStart}
					onTouchStart={onTouchStart}
					onTouchMove={onTouchMove}
					onTouchEnd={onTouchEnd}
					resize={{size: null, aspectRatio: null}}
				/>
			</>,
			document.body,
		)
	}
}

export default ImageZoom
