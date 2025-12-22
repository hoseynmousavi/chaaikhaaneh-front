import {serverReq} from "ContextWrapper"
import OS_TYPES from "constant/general/OS_TYPES"

function getOS() {
	let OS = ""
	const userAgent = (typeof window !== "undefined" ? window.navigator.userAgent : serverReq.headers["user-agent"])?.toLowerCase?.() ?? ""
	if (userAgent.indexOf("iphone") !== -1) OS = OS_TYPES.ios
	else if (userAgent.indexOf("macintosh") !== -1) OS = OS_TYPES.mac
	else if (userAgent.indexOf("windows") !== -1) OS = OS_TYPES.windows
	else if (userAgent.indexOf("android") !== -1) OS = OS_TYPES.android
	else if (userAgent.indexOf("appplewebkit") !== -1 || userAgent.indexOf("tv") !== -1) OS = OS_TYPES.tv
	else if (userAgent.indexOf("linux") !== -1) OS = OS_TYPES.linux
	return OS
}

export default getOS
