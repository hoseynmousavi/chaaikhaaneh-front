import App from "App"
import ContextWrapper from "ContextWrapper"
import registerSW from "serviceWorkerRegistration"
import withRouter from "helpers/router/withRouter"
import {createRoot, hydrateRoot} from "react-dom/client"
import "styles/index.scss"

if (typeof window !== "undefined") {
	const WrappedApp = withRouter(App)
	if (document.documentElement.style.display !== "none" && document.getElementById("server-data")) {
		console.log("hydrate")
		hydrateRoot(
			document.getElementById("root")!,
			<ContextWrapper>
				<WrappedApp />
			</ContextWrapper>,
			{onCaughtError: _captureError, onUncaughtError: _captureError, onRecoverableError: _captureError},
		)
	} else {
		console.log("render")
		const root = createRoot(document.getElementById("root")!, {
			onCaughtError: _captureError,
			onUncaughtError: _captureError,
			onRecoverableError: _captureError,
		})
		root.render(
			<ContextWrapper>
				<WrappedApp />
			</ContextWrapper>,
		)
		document.documentElement.style.removeProperty("display")
	}

	registerSW()
}

function _captureError(...err: any[]) {
	console.error(err)
}
