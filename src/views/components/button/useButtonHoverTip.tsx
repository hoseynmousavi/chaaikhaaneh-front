import ArrowPolygonSvg from "media/svg/ArrowPolygonSvg"
import {type MouseEvent, useRef} from "react"
import type {useButtonHoverTipType} from "types/ButtonType"

function useButtonHoverTip(props: useButtonHoverTipType) {
	const {hoverTip, btnRef, onMouseEnter, onMouseLeave} = props
	const iconRef = useRef<SVGSVGElement>(null)
	const hoverRef = useRef<HTMLDivElement>(null)

	function onHoverEnter(e: MouseEvent) {
		onMouseEnter?.(e)
		if (!!btnRef?.current && !!hoverRef.current && !!iconRef.current) {
			// @ts-expect-error - ok
			btnRef.current.addEventListener("click", onHoverLeave, {passive: true, once: true})

			const rect = btnRef.current.getBoundingClientRect()
			const {x, y, width, height} = rect

			hoverRef.current.style.display = "flex"

			if (y - height - hoverRef.current.clientHeight - 8 > 0) {
				hoverRef.current.style.flexDirection = "column"
				hoverRef.current.style.bottom = "calc(100% + 8px)"
			} else {
				iconRef.current.style.transform = "rotate(180deg)"
				hoverRef.current.style.flexDirection = "column-reverse"
				hoverRef.current.style.top = "calc(100% + 8px)"
			}

			if (x + width / 2 + hoverRef.current.clientWidth / 2 > document.body.clientWidth) {
				hoverRef.current.style.right = "0"
				iconRef.current.style.marginInlineEnd = "auto"
				iconRef.current.style.marginInlineStart = `calc(${width}px / 2)`
			} else {
				if (x + width / 2 - hoverRef.current.clientWidth / 2 > 0) {
					hoverRef.current.style.left = `calc(50%)`
					hoverRef.current.style.transform = "translateX(-50%)"
				} else {
					hoverRef.current.style.left = "0"
					iconRef.current.style.marginInlineStart = "auto"
					iconRef.current.style.marginInlineEnd = `calc(${width}px / 2)`
				}
			}
		}
	}

	function onHoverLeave(e: MouseEvent) {
		onMouseLeave?.(e)
		if (!!btnRef?.current && !!iconRef.current && !!hoverRef.current) {
			// @ts-expect-error - ok
			btnRef.current.removeEventListener("click", onHoverLeave)
			iconRef.current.removeAttribute("style")
			hoverRef.current.removeAttribute("style")
		}
	}

	const hoverOutput = !!hoverTip && (
		<div className="btn-hover-tip" ref={hoverRef}>
			<div className="btn-hover-tip-title">{hoverTip}</div>
			<ArrowPolygonSvg iconRef={iconRef} className="btn-hover-tip-icon" />
		</div>
	)

	return {hoverOutput, onHoverEnter: hoverTip ? onHoverEnter : onMouseEnter, onHoverLeave: hoverTip ? onHoverLeave : onMouseLeave}
}

export default useButtonHoverTip
