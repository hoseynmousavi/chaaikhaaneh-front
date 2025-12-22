function checkIsStandAlone() {
	return window?.matchMedia?.("(display-mode: standalone)")?.matches
}

export default checkIsStandAlone
