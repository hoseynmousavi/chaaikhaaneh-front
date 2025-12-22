function getIsVertical() {
	if (typeof window !== "undefined") {
		return window.innerWidth < window.innerHeight
	} else {
		return false
	}
}

export default getIsVertical
