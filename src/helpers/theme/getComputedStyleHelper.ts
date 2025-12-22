function getComputedStyleHelper(variable: string) {
	if (typeof getComputedStyle === "undefined") {
		return ""
	} else {
		return getComputedStyle(document.documentElement).getPropertyValue(variable)
	}
}

export default getComputedStyleHelper
