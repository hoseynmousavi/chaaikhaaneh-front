export interface RefreshTokenProps {
	status: "OK" | "NOK"
}

function configRefreshToken() {
	window.refreshToken = (props: RefreshTokenProps) => {
		const event = new CustomEvent("refreshToken", {detail: props})
		window.dispatchEvent(event)
	}
}

function refreshToken(props: RefreshTokenProps) {
	if (!window.refreshToken) {
		configRefreshToken()
	}

	window.refreshToken(props)
}

function subscribeRefreshToken({callback}: {callback: (e: CustomEventInit<RefreshTokenProps>) => void}) {
	window.addEventListener("refreshToken", callback, {passive: true})
	return () => window.removeEventListener("refreshToken", callback)
}

const refreshTokenManager = {refreshToken, subscribeRefreshToken}

export default refreshTokenManager
