import {MODAL_DONT_GESTURE} from "constant/modal/MODAL_DONT_GESTURE"
import b64ToFile from "helpers/file/b64ToFile"
import getTextConstant from "helpers/general/getTextConstant"
import router from "helpers/router/router"
import {type MouseEvent, type TouchEvent, useEffect, useRef, useState} from "react"
import Button from "views/components/button/Button"
import CropZoomSlider from "views/components/crop/CropZoomSlider"

interface Props {
	minScale: number
	maxScale: number
	cropRatio: number
	selectedAvatar: string
	fitWithWidth: boolean
	holeRatio: number
	submitAndClose: (file: File) => void
	errorAndClose: (toastTxt: string) => void
	cropWidthRatio: number
	marginWidthRatio: number
	distanceWidthRatio: number
	cropHeightRatio: number
	marginHeightRatio: number
	distanceHeightRatio: number
}

function CropModalContent(props: Props) {
	const {
		minScale,
		maxScale,
		cropRatio,
		selectedAvatar,
		fitWithWidth,
		holeRatio,
		submitAndClose,
		errorAndClose,
		cropWidthRatio,
		marginWidthRatio,
		distanceWidthRatio,
		cropHeightRatio,
		marginHeightRatio,
		distanceHeightRatio,
	} = props
	const textConstant = getTextConstant()
	const [isLoading, setIsLoading] = useState(false)
	const [zoomScale, setZoomScale] = useState(minScale)
	const avatarRef = useRef<HTMLImageElement>(null)
	const contRef = useRef<HTMLDivElement>(null)
	const preX = useRef(0)
	const preY = useRef(0)
	const posX = useRef(0)
	const posY = useRef(0)
	const pinch = useRef({x: 0, y: 0, distance: 0, startScale: 0})
	const isPinching = useRef(false)
	const makeRightTimerRef = useRef<ReturnType<typeof setTimeout>>(null)

	useEffect(() => {
		function onWheel(e: WheelEvent) {
			e.preventDefault()
			if (e.ctrlKey || e.metaKey) {
				setZoomScale(scale => Math.min(maxScale, Math.max(minScale, scale * Math.exp(-e.deltaY / 100))))
				makeItRight()
			}
		}

		contRef.current?.addEventListener("wheel", onWheel, {passive: false})

		return () => contRef?.current?.removeEventListener?.("wheel", onWheel)
	}, [])

	function submitCrop() {
		if (contRef.current && avatarRef.current) {
			const sizeWidth = contRef.current.clientWidth
			const sizeHeight = contRef.current.clientHeight
			setIsLoading(true)
			const nWidth = avatarRef.current.naturalWidth
			const nHeight = avatarRef.current.naturalHeight
			const canvas = document.createElement("canvas")
			canvas.width = (nWidth * (cropWidthRatio * sizeWidth)) / avatarRef.current.width
			canvas.height = (nHeight * (cropHeightRatio * sizeHeight)) / avatarRef.current.height
			const context = canvas.getContext("2d")
			context?.drawImage(
				avatarRef.current,
				(nWidth * (marginWidthRatio * sizeWidth - avatarRef.current.offsetLeft - percentToPixels({percent: preX.current, byWidth: true}))) / avatarRef.current.width,
				(nHeight * (marginHeightRatio * sizeHeight - avatarRef.current.offsetTop - percentToPixels({percent: preY.current, byWidth: false}))) / avatarRef.current.height,
				(nWidth * (cropWidthRatio * sizeWidth)) / avatarRef.current.width,
				(nHeight * (cropHeightRatio * sizeHeight)) / avatarRef.current.height,
				0,
				0,
				(nWidth * (cropWidthRatio * sizeWidth)) / avatarRef.current.width,
				(nHeight * (cropHeightRatio * sizeHeight)) / avatarRef.current.height,
			)
			try {
				const preview = canvas.toDataURL("image/png")
				const block = preview.split(";")
				const contentType = block[0].split(":")[1]
				const realData = block[1].split(",")[1]
				const file = b64ToFile({b64Data: realData, contentType})
				submitAndClose(file)
			} catch (_) {
				errorAndClose("onCropFailed")
			}
		}
	}

	function pixelsToPercent({pixels, byWidth}: {pixels: number; byWidth: boolean}) {
		const imgWidth = avatarRef.current?.width ?? 0
		const imgHeight = avatarRef.current?.height ?? 0
		return (pixels / (byWidth ? imgWidth : imgHeight)) * 100
	}

	function percentToPixels({percent, byWidth}: {percent: number; byWidth: boolean}) {
		const imgWidth = avatarRef.current?.width ?? 0
		const imgHeight = avatarRef.current?.height ?? 0
		return (percent / 100) * (byWidth ? imgWidth : imgHeight)
	}

	function onMouseDown(e: MouseEvent) {
		if (!isLoading) {
			posX.current = e.clientX
			posY.current = e.clientY
			// @ts-expect-error - ok
			document.addEventListener("mousemove", elementDrag, {passive: true})
			document.addEventListener("mouseup", closeDragElement, {passive: true})
		}
	}

	function elementDrag(e: MouseEvent) {
		if (!isLoading) {
			const deltaX = posX.current - e.clientX
			const deltaY = posY.current - e.clientY
			posX.current = e.clientX
			posY.current = e.clientY
			preX.current = preX.current - pixelsToPercent({pixels: deltaX, byWidth: true})
			preY.current = preY.current - pixelsToPercent({pixels: deltaY, byWidth: false})
			if (avatarRef.current) {
				avatarRef.current.style.transform = `translate3d(${preX.current}%, ${preY.current}%, 0)`
			}
		}
	}

	function closeDragElement() {
		// @ts-expect-error - ok
		document.removeEventListener("mousemove", elementDrag)
		document.removeEventListener("mouseup", closeDragElement)
		makeItRight()
	}

	function distance(e: TouchEvent) {
		return Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY)
	}

	function onTouchStart(e: TouchEvent) {
		if (!isLoading) {
			if (e.touches.length === 2) {
				isPinching.current = true
				pinch.current.x = (e.touches[0].clientX + e.touches[1].clientX) / 2
				pinch.current.y = (e.touches[0].clientY + e.touches[1].clientY) / 2
				pinch.current.distance = distance(e)
				pinch.current.startScale = zoomScale
			} else {
				isPinching.current = false
				posX.current = e.touches[0].clientX
				posY.current = e.touches[0].clientY
			}
		}
	}

	function onTouchMove(e: TouchEvent) {
		if (!isLoading) {
			if (e.touches.length === 2) {
				if (isPinching.current) {
					const currentScale = distance(e) / pinch.current.distance
					setZoomScale(Math.min(maxScale, Math.max(minScale, pinch.current.startScale * currentScale)))
					const deltaX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - pinch.current.x
					const deltaY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - pinch.current.y
					pinch.current.x = (e.touches[0].clientX + e.touches[1].clientX) / 2
					pinch.current.y = (e.touches[0].clientY + e.touches[1].clientY) / 2
					preX.current = preX.current + pixelsToPercent({pixels: deltaX, byWidth: true})
					preY.current = preY.current + pixelsToPercent({pixels: deltaY, byWidth: false})
					if (avatarRef.current) {
						avatarRef.current.style.transform = `translate3d(${preX.current}%, ${preY.current}%, 0)`
					}
				}
			} else {
				if (!isPinching.current) {
					const deltaX = posX.current - e.touches[0].clientX
					const deltaY = posY.current - e.touches[0].clientY
					posX.current = e.touches[0].clientX
					posY.current = e.touches[0].clientY
					preX.current = preX.current - pixelsToPercent({pixels: deltaX, byWidth: true})
					preY.current = preY.current - pixelsToPercent({pixels: deltaY, byWidth: false})
					if (avatarRef.current) {
						avatarRef.current.style.transform = `translate3d(${preX.current}%, ${preY.current}%, 0)`
					}
				}
			}
		}
	}

	function makeItRight() {
		if (makeRightTimerRef.current) clearTimeout(makeRightTimerRef.current)
		makeRightTimerRef.current = setTimeout(() => {
			if (avatarRef.current && contRef.current) {
				const sizeWidth = contRef.current.clientWidth
				const sizeHeight = contRef.current.clientHeight
				const preXInPixels = percentToPixels({percent: preX.current, byWidth: true})
				const preYInPixels = percentToPixels({percent: preY.current, byWidth: false})

				if (avatarRef.current.offsetLeft + preXInPixels > marginWidthRatio * sizeWidth) {
					preX.current = preX.current - pixelsToPercent({pixels: avatarRef.current.offsetLeft + preXInPixels - marginWidthRatio * sizeWidth, byWidth: true})
				} else if (avatarRef.current.offsetLeft + preXInPixels + avatarRef.current.width < distanceWidthRatio * sizeWidth) {
					preX.current = preX.current + pixelsToPercent({pixels: distanceWidthRatio * sizeWidth - (avatarRef.current.offsetLeft + preXInPixels + avatarRef.current.width), byWidth: true})
				}

				if (avatarRef.current.offsetTop + preYInPixels > marginHeightRatio * sizeHeight) {
					preY.current = preY.current - pixelsToPercent({pixels: avatarRef.current.offsetTop + preYInPixels - marginHeightRatio * sizeHeight, byWidth: false})
				} else if (avatarRef.current.offsetTop + preYInPixels + avatarRef.current.height < distanceHeightRatio * sizeHeight) {
					preY.current = preY.current + pixelsToPercent({pixels: distanceHeightRatio * sizeHeight - (avatarRef.current.offsetTop + preYInPixels + avatarRef.current.height), byWidth: false})
				}

				avatarRef.current.style.transition = "transform linear 0.1s"
				avatarRef.current.style.transform = `translate3d(${preX.current}%, ${preY.current}%, 0)`
				setTimeout(() => {
					if (avatarRef.current) {
						avatarRef.current.style.transition = "none"
					}
				}, 150)
			}
		}, 100)
	}

	function setZoom(value: number) {
		if (avatarRef.current) {
			setZoomScale(value)
			makeItRight()
		}
	}

	return (
		<>
			<div className="crop-header">{textConstant.crop}</div>
			{/** biome-ignore lint/a11y/noStaticElementInteractions: <ok> */}
			<div className={`crop-content ${MODAL_DONT_GESTURE}`} ref={contRef} onMouseDown={onMouseDown} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={makeItRight}>
				<img
					className="crop-content-img"
					ref={avatarRef}
					src={selectedAvatar}
					style={fitWithWidth ? {width: `${zoomScale * 100}%`} : {height: `${zoomScale * 100}%`}}
					alt="cropping"
					draggable="false"
				/>
				<div className="crop-content-circle" style={{width: `${holeRatio * 100}%`, aspectRatio: cropRatio, borderRadius: cropRatio === 1 ? "50%" : "var(--second-radius)"}} />
			</div>
			<CropZoomSlider disabled={!selectedAvatar || isLoading} onChange={setZoom} min={minScale} max={maxScale} value={zoomScale} />
			<div className="crop-btn">
				<Button desktopType="outline-second-on-surface-first" desktopSize="large" mobileSize="medium" desktopIsFullWidth isDisable={!selectedAvatar} isLoading={isLoading} onClick={router.back}>
					{textConstant.cancel}
				</Button>
				<Button desktopType="primary" desktopSize="large" mobileSize="medium" desktopIsFullWidth isDisable={!selectedAvatar} isLoading={isLoading} onClick={submitCrop}>
					{textConstant.confirm}
				</Button>
			</div>
		</>
	)
}

export default CropModalContent
