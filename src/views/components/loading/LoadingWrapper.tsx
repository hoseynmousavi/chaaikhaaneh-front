import LoadingBorderSvg from "media/svg/LoadingBorderSvg"
import LogoSvg from "media/svg/LogoSvg"

interface Props {
	className?: string
	isFixed?: boolean
}

function LoadingWrapper(props: Props) {
	const {className = "", isFixed} = props
	return (
		<div className={`loading-wrapper ${isFixed ? "fixed" : ""} ${className}`}>
			<div className="loading-wrapper-content">
				<LoadingBorderSvg className="loading-wrapper-content-border" />
				<LogoSvg className="loading-wrapper-content-logo" />
			</div>
		</div>
	)
}

export default LoadingWrapper
