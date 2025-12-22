import changeBodyOverflow from "helpers/router/changeBodyOverflow"
import getFullUrl from "helpers/router/getFullUrl"
import router from "helpers/router/router"
import themeManager from "helpers/theme/themeManager"

function onPopState({key = "Escape", callback, statusBarColor}: {key?: string; callback: () => void; statusBarColor?: string}) {
	let pushed = 0

	function onPushState() {
		pushed++
	}

	function onPopState() {
		if (pushed) {
			pushed--
		} else {
			window.screenSetState?.(state => ({...state, modalStackCount: state.modalStackCount - 1}))
			callback()
			window.removeEventListener("popstate", onPopState)
			window.removeEventListener("pushstate", onPushState)
			changeBodyOverflow(false)
			if (statusBarColor) themeManager.popBarColor()
			if (key) document.removeEventListener("keydown", onKeyDown)
		}
	}

	function onKeyDown(e: KeyboardEvent) {
		if (e.key === key) router.back()
	}

	window.screenSetState?.(state => ({...state, modalStackCount: state.modalStackCount + 1}))
	router.pushState({url: getFullUrl().fullUrl, data: "for-history"})
	window.addEventListener("popstate", onPopState, {passive: true})
	window.addEventListener("pushstate", onPushState, {passive: true})
	changeBodyOverflow(true)
	if (statusBarColor) themeManager.pushBarColor({barColor: statusBarColor})
	if (key) document.addEventListener("keydown", onKeyDown, {passive: true})

	return () => {
		window.removeEventListener("popstate", onPopState)
		window.removeEventListener("pushstate", onPushState)
	}
}

export default onPopState
