import onPageLoaded from "helpers/general/onPageLoaded"
import yieldTask from "helpers/general/yieldTask"

let hadInteraction = false

function onFirstInteraction({callback}: {callback: () => void}) {
	if (hadInteraction) {
		yieldTask().then(callback)
	} else {
		onPageLoaded({
			callback: () => {
				function handleInteraction() {
					hadInteraction = true
					yieldTask().then(callback)

					document.removeEventListener("mousemove", handleInteraction)
					document.removeEventListener("keydown", handleInteraction)
					document.removeEventListener("click", handleInteraction)
					document.removeEventListener("touchstart", handleInteraction)
				}

				document.addEventListener("mousemove", handleInteraction, {passive: true})
				document.addEventListener("keydown", handleInteraction, {passive: true})
				document.addEventListener("click", handleInteraction, {passive: true})
				document.addEventListener("touchstart", handleInteraction, {passive: true})
			},
		})
	}
}

export default onFirstInteraction
