import RadioFillSvg from "media/svg/RadioFillSvg"
import RadioSvg from "media/svg/RadioSvg"

interface Props {
	mobileSize?: "small" | "medium" | "large"
	desktopSize?: "small" | "medium" | "large"
	isActive: boolean
}

function RadioButton({isActive, mobileSize = "medium", desktopSize = "medium"}: Props) {
	const desktopSizeClass = `desktop-${desktopSize || mobileSize || "medium"}`
	const mobileSizeClass = `mobile-${mobileSize || desktopSize || "medium"}`
	return (
		<div className={`radio-button ${desktopSizeClass} ${mobileSizeClass}`}>
			<RadioFillSvg className={`radio-button-item fill ${isActive ? "" : "hide"}`} />
			<RadioSvg className={`radio-button-item ${!isActive ? "" : "hide"}`} />
		</div>
	)
}

export default RadioButton
