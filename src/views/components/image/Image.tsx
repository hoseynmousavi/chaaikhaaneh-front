import SCREEN_CONSTANT from "constant/general/SCREEN_CONSTANT"
import getResizedImage from "helpers/image/getResizedImage"
import ssrPreload from "helpers/router/ssrPreload"
import {lazy, type MouseEvent, memo, Suspense, useEffect, useRef, useState} from "react"
import type {BaseImageType, BaseImageTypeWithDesktop} from "types/ImageType"

const ImageZoom = lazy(() => import("views/components/image/ImageZoom"))

function Image(props: BaseImageType | BaseImageTypeWithDesktop) {
	const {className = "", src, alt = "", loading = "lazy", zoomOnClick, preload, onClick, style, contRef, resize, onMouseEnter, onMouseLeave, onMouseDown, onTouchStart, onTouchMove, onTouchEnd} = props
	const tempRef = useRef<HTMLImageElement>(null)
	const imgRef = contRef || tempRef
	const [showZoom, setShowZoom] = useState(false)
	const loadedRef = useRef(false)
	const failRef = useRef(false)
	const sourceRef = useRef<HTMLSourceElement>(null)
	const {sizedImage, placeholder} = getResizedImage({resize, src})

	const pictureClassName = "pictureClassName" in props ? props.pictureClassName : ""
	const desktopSrc = "desktopSrc" in props ? props.desktopSrc : undefined
	const desktopResize = "desktopResize" in props ? props.desktopResize : undefined
	const {sizedImage: desktopSizedImage, placeholder: desktopPlaceholder} = desktopSrc && desktopResize ? getResizedImage({resize: desktopResize, src: desktopSrc}) : {}

	function openZoom(e: MouseEvent) {
		e.stopPropagation()
		setShowZoom(true)
	}

	ssrPreload({sizedImage, desktopSizedImage, preload})

	useEffect(() => {
		if (imgRef?.current?.complete) onLoad()
	}, [])

	function onLoad() {
		if (imgRef.current) {
			loadedRef.current = true
			failRef.current = !!((placeholder && imgRef.current.currentSrc.endsWith(placeholder)) || (desktopPlaceholder && imgRef.current.currentSrc.endsWith(desktopPlaceholder)))
			imgRef.current.className = `${className} image-loading-main ${failRef.current ? "load-fail" : "load-end"}` // load-fail and load-end are using in many css
		}
	}

	function onError() {
		if (imgRef.current) {
			const isDesktop = desktopSizedImage && imgRef.current.currentSrc.endsWith(desktopSizedImage)
			const setPlaceholder = isDesktop && desktopPlaceholder ? desktopPlaceholder : placeholder
			if (setPlaceholder) {
				if (imgRef.current.currentSrc === sizedImage) {
					if (!imgRef.current.currentSrc.endsWith(setPlaceholder)) {
						imgRef.current.src = setPlaceholder
					}
				} else if (imgRef.current.currentSrc === desktopSizedImage) {
					if (!imgRef.current.currentSrc.endsWith(setPlaceholder)) {
						if (sourceRef.current) sourceRef.current.srcset = setPlaceholder
					}
				}
			}
		}
	}

	const layout = (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <ok>
		<img
			className={`${className} image-loading-main ${failRef.current ? "load-fail" : loadedRef.current ? "load-end" : `skeleton`}`}
			onLoad={onLoad}
			onError={onError}
			style={style}
			ref={imgRef}
			loading={loading} // it's important to "loading" comes before src
			fetchPriority={loading === "eager" ? "high" : undefined}
			decoding="async"
			crossOrigin="" // this is just cause of service worker can cache
			src={sizedImage}
			alt={alt}
			onClick={zoomOnClick ? openZoom : onClick ? onClick : undefined}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onMouseDown={onMouseDown}
			onTouchStart={onTouchStart}
			onTouchMove={onTouchMove}
			onTouchEnd={onTouchEnd}
		/>
	)

	return (
		<>
			{desktopSizedImage ? (
				<picture className={pictureClassName}>
					<source ref={sourceRef} srcSet={desktopSizedImage} media={SCREEN_CONSTANT.desktopMedia} />
					{layout}
				</picture>
			) : (
				layout
			)}

			{showZoom && (
				<Suspense fallback={null}>
					<ImageZoom imgRef={imgRef} close={() => setShowZoom(false)} />
				</Suspense>
			)}
		</>
	)
}

export default memo(Image)
