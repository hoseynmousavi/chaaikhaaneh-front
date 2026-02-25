import stopPropagation from "helpers/general/stopPropagation"
import modalDisableAnimation from "helpers/modal/modalDisableAnimation"
import router from "helpers/router/router"
import {type MouseEvent, useEffect, useImperativeHandle, useRef, useState} from "react"
import {createPortal} from "react-dom"
import type {DesktopModalType} from "types/ModalType"

function DesktopModal(props: DesktopModalType) {
	const {children, className, backClassName, close, ref, disableClose, anchorRef, anchorOrigin, root = document.body} = props
	const isAnchored = !!anchorRef && !!anchorOrigin
	const [hide, setIsHide] = useState(false)
	const desktopModalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (isAnchored && anchorRef.current && desktopModalRef.current) {
			const {left, top, height, right} = anchorRef.current.getBoundingClientRect()
			switch (anchorOrigin) {
				case "top start": {
					desktopModalRef.current.style.insetInlineStart = `${right}px`
					desktopModalRef.current.style.top = `${top + 8 + height}px`
					desktopModalRef.current.style.transformOrigin = "top right"
					break
				}
				case "top end": {
					desktopModalRef.current.style.insetInlineEnd = `${left}px`
					desktopModalRef.current.style.top = `${top + 8 + height}px`
					desktopModalRef.current.style.transformOrigin = "top left"
					break
				}
				case "bottom start": {
					desktopModalRef.current.style.insetInlineStart = `${right}px`
					desktopModalRef.current.style.bottom = `${window.innerHeight - top}px`
					desktopModalRef.current.style.transformOrigin = "bottom right"
					break
				}
				case "bottom end": {
					desktopModalRef.current.style.insetInlineEnd = `${left}px`
					desktopModalRef.current.style.bottom = `${window.innerHeight - top}px`
					desktopModalRef.current.style.transformOrigin = "bottom left"
					break
				}
			}
		}
	}, [])

	useImperativeHandle(ref, () => ({desktopClose: closeModal}), [])

	function closeModal() {
		setIsHide(true)
		if (close) {
			setTimeout(close, 350)
		}
	}

	function goBackIfNotHiding(e: MouseEvent) {
		stopPropagation(e)
		if (disableClose) {
			modalDisableAnimation({contRef: desktopModalRef, isDesktop: true})
		} else if (!hide) {
			router.back()
		}
	}

	return createPortal(
		<>
			{/** biome-ignore lint/a11y/noStaticElementInteractions: <ok> */}
			{/** biome-ignore lint/a11y/useKeyWithClickEvents: <ok> */}
			<div className={`modal-background ${backClassName} ${hide ? "hide" : ""}`} onClick={goBackIfNotHiding} />
			{/** biome-ignore lint/a11y/noStaticElementInteractions: <ok> */}
			{/** biome-ignore lint/a11y/useKeyWithClickEvents: <ok> */}
			<div
				className={`desktop-modal ${isAnchored ? "anchored" : ""} ${className} ${hide ? "hide" : ""}`}
				ref={desktopModalRef}
				onClick={stopPropagation}
			>
				{children}
			</div>
		</>,
		root as HTMLElement,
	)
}

export default DesktopModal
