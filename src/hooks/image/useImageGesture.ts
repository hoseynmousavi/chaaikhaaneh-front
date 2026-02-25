import router from "helpers/router/router"
import {type MouseEvent, type TouchEvent, useRef} from "react"

function useImageGesture() {
	const gesture = useRef(false)
	const maxDiff = 600
	const posY = useRef(0)
	const translateY = useRef(0)
	const deltaY = useRef(0)
	const imageBackRef = useRef<HTMLDivElement>(null)
	const imageRef = useRef<HTMLImageElement>(null)

	function onTouchStart(e: TouchEvent | MouseEvent) {
		if (!("button" in e) || e.button === 0) {
			posY.current = "touches" in e ? e.touches?.[0].clientY : e.clientY
			gesture.current = true
			if (imageBackRef.current) imageBackRef.current.style.transition = "none"
			if (imageRef.current) imageRef.current.style.transition = "none"
			if ("button" in e && e.button === 0) {
				// @ts-expect-error
				document.addEventListener("mousemove", onTouchMove, {passive: true})
				document.addEventListener("mouseup", onTouchEnd, {passive: true})
			}
		}
	}

	function onTouchMove(e: TouchEvent | MouseEvent) {
		if (gesture.current && imageBackRef.current && imageRef.current) {
			deltaY.current = posY.current - ("touches" in e ? e.touches?.[0].clientY : e.clientY)
			posY.current = "touches" in e ? e.touches?.[0].clientY : e.clientY
			translateY.current =
				translateY.current - deltaY.current <= maxDiff
					? translateY.current - deltaY.current >= -maxDiff
						? translateY.current - deltaY.current
						: -maxDiff
					: maxDiff
			window.requestAnimationFrame(() => {
				if (imageRef.current) imageRef.current.style.transform = `translate3d(0, ${translateY.current}px, 0)`
			})
			imageBackRef.current.style.opacity = `${Math.max(1 - Math.abs(translateY.current / maxDiff), 0.4)}`
		}
	}

	function onTouchEnd() {
		if (gesture.current && imageBackRef.current && imageRef.current) {
			if (deltaY.current > 3 || deltaY.current < -3 || Math.abs(translateY.current) > 200) {
				imageRef.current.style.top = `${+imageRef.current.style.top.replace("px", "") + translateY.current}px`
				translateY.current = 0
				window.requestAnimationFrame(() => {
					if (imageRef.current) imageRef.current.style.transform = `translate3d(0, ${translateY.current}, 0)`
				})
				setTimeout(() => {
					if (imageBackRef.current) imageBackRef.current.style.transition = "opacity var(--first-transition)"
					if (imageRef.current) imageRef.current.style.transition = "all var(--first-transition)"
					setTimeout(router.back, 10)
				}, 10)
			} else {
				imageBackRef.current.style.transition = "opacity var(--first-transition)"
				imageRef.current.style.transition = "all var(--first-transition)"
				translateY.current = 0
				window.requestAnimationFrame(() => {
					if (imageRef.current) imageRef.current.style.transform = `translate3d(0, ${translateY.current}, 0)`
				})
				imageBackRef.current.style.opacity = `1`
			}
			gesture.current = false
			// @ts-expect-error
			document.removeEventListener("mousemove", onTouchMove)
			document.removeEventListener("mouseup", onTouchEnd)
		}
	}

	return {onTouchStart, onTouchMove, onTouchEnd, imageRef, imageBackRef}
}

export default useImageGesture
