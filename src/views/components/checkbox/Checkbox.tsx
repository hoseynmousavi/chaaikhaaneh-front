import CheckBoxTickSvg from "media/svg/CheckBoxTickSvg"

interface Props {
	mobileSize?: "small" | "medium" | "large"
	desktopSize?: "small" | "medium" | "large"
	isActive: boolean
}

function Checkbox({isActive, mobileSize, desktopSize}: Props) {
	const desktopSizeClass = `desktop-${desktopSize || mobileSize || "medium"}`
	const mobileSizeClass = `mobile-${mobileSize || desktopSize || "medium"}`
	return (
		<div className={`checkbox ${desktopSizeClass} ${mobileSizeClass}`}>
			<div className={`checkbox-inner ${isActive ? "" : "hide"}`}>
				<CheckBoxTickSvg className="checkbox-inner-icon" />
			</div>
		</div>
	)
}

export default Checkbox
