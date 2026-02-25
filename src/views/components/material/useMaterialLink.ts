import EXTERNAL_ROUTES from "constant/routing/EXTERNAL_ROUTES"
import router from "helpers/router/router"
import {type MouseEvent, useRef} from "react"
import type {useMaterialType} from "types/MaterialLinkType"

function useMaterialLink(props: useMaterialType) {
	const {rippleColor, ref, isDisable, disableRipple, onDisableClick, onClick, link} = props
	const {to, replace, data, target} = link || {}
	const tempRef = useRef<HTMLButtonElement>(null)
	const propRef = ref || tempRef

	function appendRipple(e: MouseEvent) {
		if (propRef.current) {
			const {clientX, clientY} = e || {}
			const rect = propRef.current.getBoundingClientRect()
			let rippleContainer: null | HTMLSpanElement = document.createElement("span")
			rippleContainer.className = "ripple-container"
			const ripple = document.createElement("span")
			ripple.className = "ripple"
			if (rippleColor) ripple.style.backgroundColor = rippleColor
			ripple.style.height = ripple.style.width = `${1.3 * Math.max(rect.width, rect.height)}px`
			rippleContainer.appendChild(ripple)
			propRef.current.appendChild(rippleContainer)
			ripple.style.top = `${clientY - rect.top - ripple.offsetHeight / 2}px`
			ripple.style.left = `${clientX - rect.left - ripple.offsetWidth / 2}px`

			setTimeout(() => {
				try {
					rippleContainer?.remove?.()
					rippleContainer = null
				} catch (_) {}
			}, 600)
		}
	}

	function _onClick(e: MouseEvent) {
		if (isDisable) {
			onDisableClick?.(e)
		} else {
			if (!disableRipple) appendRipple(e)
			onClick?.(e)
		}

		if (to) {
			const isExternal =
				to.startsWith("mailto:") ||
				target === "_blank" ||
				(to.startsWith("http") &&
					(new URL(to).host !== window.location.host || EXTERNAL_ROUTES.some(item => new URL(to).pathname.startsWith(item)))) ||
				(!to.startsWith("/") && !to.startsWith("http")) ||
				EXTERNAL_ROUTES.some(item => to.startsWith(item))

			if (!isExternal && !e.ctrlKey && !e.metaKey) {
				e.preventDefault()
				if (onClick) {
					setTimeout(route, 20)
				} else {
					route()
				}
			}
		}
	}

	function route() {
		if (to) {
			if (replace) router.replaceState({url: to, data})
			else router.pushState({url: to, data})
		}
	}

	return {_onClick, propRef}
}

export default useMaterialLink
