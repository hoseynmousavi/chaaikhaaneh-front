import type {CreatedToastType, ToastType} from "types/ToastType"

function configToast() {
	window.addToast = (props: ToastType) => {
		const event = new CustomEvent("addToast", {detail: props})
		window.dispatchEvent(event)
	}
}

function addToast(props: ToastType) {
	if (!window.addToast) {
		configToast()
	}

	window.addToast(props)
}

function subscribeAddToast({callback}: {callback: (e: CustomEventInit<CreatedToastType>) => void}) {
	window.addEventListener("addToast", callback, {passive: true})
	return () => window.removeEventListener("addToast", callback)
}

const toastManager = {addToast, subscribeAddToast}

export default toastManager
