import hexToRgba from "helpers/general/hexToRgba"
import getComputedStyleHelper from "helpers/theme/getComputedStyleHelper"

function getRgbaFromColor({color, variable, alpha = 0.2}: {color?: string; variable?: string; alpha?: number}) {
	const input = color ? color : variable ? getComputedStyleHelper(variable) : ""
	if (input.includes("rgba")) {
		const split = input.split(",")
		const a = split[3]
		return input.replace(a, `${alpha})`)
	} else if (input.includes("rgb")) {
		return input.replace("rgb", "rgba").replace(")", `, ${alpha})`)
	} else {
		return hexToRgba(input, alpha)
	}
}

export default getRgbaFromColor
