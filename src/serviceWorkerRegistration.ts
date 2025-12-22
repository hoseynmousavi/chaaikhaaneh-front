function registerSW() {
	if (process.env.NODE_ENV === "production" && window.location.hostname !== "localhost" && "serviceWorker" in navigator) {
		window.addEventListener(
			"load",
			() => {
				navigator.serviceWorker
					.register("/service-worker.js", {updateViaCache: "all"})
					.then(registration => {
						registration.update()
						registration.onupdatefound = () => {
							const waitingServiceWorker = registration.waiting
							if (waitingServiceWorker) {
								waitingServiceWorker.postMessage({type: "SKIP_WAITING"})
							}
						}
					})
					.catch(error => console.log("Error during service worker registration:", error))
			},
			{passive: true, once: true},
		)
	}
}

export default registerSW
