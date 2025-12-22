function configTokenRefreshed() {
	window.tokenRefreshed = () => {
		const event = new CustomEvent("tokenRefreshed")
		window.dispatchEvent(event)
	}
}

function tokenRefreshed() {
	if (!window.tokenRefreshed) {
		configTokenRefreshed()
	}

	window.tokenRefreshed()
}

function subscribeTokenRefreshed({callback}: {callback: () => void}) {
	window.addEventListener("tokenRefreshed", callback, {passive: true})
	return () => window.removeEventListener("tokenRefreshed", callback)
}

const tokenRefreshedManager = {tokenRefreshed, subscribeTokenRefreshed}

export default tokenRefreshedManager
