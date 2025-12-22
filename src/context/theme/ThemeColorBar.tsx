import getComputedStyleHelper from "helpers/theme/getComputedStyleHelper"
import themeManager from "helpers/theme/themeManager"
import {useEffect, useState} from "react"

function ThemeColorBar() {
	const [barColors, setBarColors] = useState([getComputedStyleHelper("--surface-fourth")])
	const barColor = barColors[barColors.length - 1]

	useEffect(() => {
		function pushBarColor(event: {detail: {barColor: string}}) {
			const {barColor} = event.detail
			setBarColors(preBarColors => [...preBarColors, barColor])
		}

		return themeManager.subscribePushBarColor({callback: pushBarColor})
	}, [])

	useEffect(() => {
		function popBarColor() {
			setBarColors(preBarColors => {
				const barColors = [...preBarColors]
				barColors.splice(barColors.length - 1, 1)
				if (barColors.length) return barColors
				else return [getComputedStyleHelper("--surface-fourth")]
			})
		}

		return themeManager.subscribePopBarColor({callback: popBarColor})
	}, [])

	useEffect(() => {
		const metaThemeColor = document.querySelector("meta[name=theme-color]")
		if (barColor && metaThemeColor) metaThemeColor.setAttribute("content", barColor)
	}, [barColor])

	return undefined
}

export default ThemeColorBar
