import pageLoaded from "helpers/general/pageLoaded"

function onPageLoaded({callback}: {callback: () => void}) {
	if (pageLoaded()) {
		callback()
	} else {
		function onLoad() {
			callback()
		}

		window.addEventListener("load", onLoad, {passive: true, once: true})
	}
}

export default onPageLoaded
