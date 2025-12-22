function hexToRgba(hex: string, a: number) {
	try {
		hex = hex.replace(/ /g, "").replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_, r, g, b) => r + r + g + g + b + b)
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
		const [, first, second, third] = result || []
		return `rgba(${parseInt(first, 16)},${parseInt(second, 16)},${parseInt(third, 16)},${a})`
	} catch (_) {
		return hex
	}
}

export default hexToRgba
