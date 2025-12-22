import SCREEN_CONSTANT from "constant/general/SCREEN_CONSTANT"

function getIsMobile() {
	if (typeof window !== "undefined") {
		return window.innerWidth <= SCREEN_CONSTANT.mobileBreakPointWidth || window.innerHeight <= SCREEN_CONSTANT.mobileBreakPointHeight
	} else {
		return false
	}
}

export default getIsMobile
