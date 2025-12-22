function configTheme() {
	window.pushBarColor = props => {
		const event = new CustomEvent("pushBarColor", {detail: props})
		window.dispatchEvent(event)
	}

	window.popBarColor = () => {
		const event = new CustomEvent("popBarColor")
		window.dispatchEvent(event)
	}
}

function pushBarColor({barColor}: {barColor: string}) {
	if (!window.pushBarColor) {
		configTheme()
	}

	window.pushBarColor?.({barColor})
}

function subscribePushBarColor({callback}: {callback: ({detail}: {detail: {barColor: string}}) => void}) {
	// @ts-expect-error
	window.addEventListener("pushBarColor", callback, {passive: true})
	// @ts-expect-error
	return () => window.removeEventListener("pushBarColor", callback)
}

function popBarColor() {
	if (!window.popBarColor) {
		configTheme()
	}

	window.popBarColor?.()
}

function subscribePopBarColor({callback}: {callback: () => void}) {
	window.addEventListener("popBarColor", callback, {passive: true})
	return () => window.removeEventListener("popBarColor", callback)
}

const themeManager = {pushBarColor, subscribePushBarColor, popBarColor, subscribePopBarColor}

export default themeManager
