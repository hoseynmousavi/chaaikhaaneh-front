import useLocation from "context/location/hooks/useLocation"
import useScreen from "context/screen/hooks/useScreen"
import animate from "helpers/general/animate"
import nothing from "helpers/general/nothing"
import useEffectJustChanges from "hooks/general/useEffectJustChanges"
import CircleFillCloseSvg from "media/svg/CircleFillCloseSvg"
import CircleFillDangerSvg from "media/svg/CircleFillDangerSvg"
import CircleFillTickSvg from "media/svg/CircleFillTickSvg"
import CloseSvg from "media/svg/CloseSvg"
import {type RefObject, useEffect, useRef} from "react"
import type {ComponentAsPropsType} from "types/ComponentAsPropsType"
import type {CreatedToastType, HTMLDivElementWithClear} from "types/ToastType"
import Button from "views/components/button/Button"

const icons = {SUCCESS: CircleFillTickSvg, INFO: CircleFillDangerSvg, WARNING: CircleFillDangerSvg, FAIL: CircleFillCloseSvg}

interface Props {
	itemsRef: RefObject<{[key: string]: HTMLDivElementWithClear}>
	item: CreatedToastType
	clearMe: (id: string) => void
}

function Toast(props: Props) {
	const toastTimeMS = 5 * 1000
	const {
		itemsRef,
		item: {id, message, description, type, onClick, haveClose, Icon, removeOnChangeLocation},
		clearMe,
	} = props
	const {isAppFocused} = useScreen()
	const clearTimer = useRef<ReturnType<typeof setTimeout>>(null)
	const animationRef = useRef<Animation>(null)
	const progressBarRef = useRef<HTMLDivElement>(null)
	const ShowIcon: ComponentAsPropsType = Icon ? Icon : icons[type]
	const {location} = useLocation()

	useEffect(() => {
		const toastRef = itemsRef.current[id].el
		if (toastRef && !!progressBarRef.current) {
			toastRef.style.transition =
				"height var(--first-transition), margin-bottom var(--first-transition), padding var(--first-transition), opacity var(--first-transition) var(--first-transition-time)"
			toastRef.style.height = `${toastRef.scrollHeight}px`
			toastRef.style.marginBottom = "8px"
			toastRef.style.opacity = "1"

			animate({
				element: progressBarRef.current,
				keyframes: [{width: "0%"}, {width: "100%"}],
				options: {duration: toastTimeMS, easing: "linear", fill: "forwards"},
			})
				.then(animation => {
					animationRef.current = animation
					if (!isAppFocused) animationRef.current.pause()
					animationRef.current.finished.then(clearItem).catch(nothing)
				})
				.catch(() => {
					setTimeout(clearItem, toastTimeMS)
				})

			return () => {
				animationRef.current?.cancel()
			}
		}
	}, [])

	useEffectJustChanges(() => {
		const animationReadyState = animationRef.current?.playState
		if (isAppFocused && animationReadyState === "paused") {
			animationRef.current?.play()
		} else if (!isAppFocused && animationReadyState === "running") {
			animationRef.current?.pause()
		}
	}, [isAppFocused])

	useEffectJustChanges(() => {
		if (removeOnChangeLocation) {
			clearItem()
		}
	}, [location])

	function clearItem() {
		if (!clearTimer.current) {
			const toastRef = itemsRef.current[id].el
			toastRef.style.transition =
				"height var(--first-transition) var(--first-transition-time), margin-bottom var(--first-transition) var(--first-transition-time), padding var(--first-transition) var(--first-transition-time), opacity var(--first-transition)"
			toastRef.style.height = "0"
			toastRef.style.marginBottom = "0"
			toastRef.style.padding = "0 12px"
			toastRef.style.opacity = "0"
			clearTimer.current = setTimeout(() => clearMe(id), 500)
		}
	}

	function onClickFunc() {
		onClick?.()
		clearItem()
	}

	function setRef(el: HTMLDivElement) {
		if (el) {
			itemsRef.current[id] = {el, clearItem}
		} else {
			delete itemsRef.current[id]
		}
	}

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: <not important>
		// biome-ignore lint/a11y/useKeyWithClickEvents: <not important>
		<div
			className={`toast-item ${type}`}
			ref={setRef}
			style={{height: "0", opacity: "0", marginBottom: "0"}}
			onTouchEnd={!onClick ? clearItem : undefined}
			onClick={onClick ? onClickFunc : clearItem}
		>
			<ShowIcon className={`toast-item-message-icon ${type}`} />
			<div className="toast-item-message">
				{message && <div className="toast-item-message-title">{message}</div>}
				{description && <div className="toast-item-message-desc">{description}</div>}
			</div>
			{haveClose && (
				<Button desktopType="ghost-outline-second" desktopSize="large" desktopIsSquare escapeStart onClick={onClick ? clearItem : undefined}>
					<CloseSvg />
				</Button>
			)}
			<div className="toast-item-progress" ref={progressBarRef} />
		</div>
	)
}

export default Toast
