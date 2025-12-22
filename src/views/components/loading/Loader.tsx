interface Props {
	className?: string
	width?: number | string | null
	strokeWidth?: number
	color?: string
}

function Loader(props: Props) {
	const {className = "", width = 32, strokeWidth = 3, color} = props
	const stroke = color || "var(--primary-color)"
	return (
		<svg className={`loader-circular ${className}`} width={width || undefined} height={width || undefined} viewBox="25 25 50 50">
			<circle className="loader-path" cx="50" cy="50" r="20" fill="none" strokeWidth={strokeWidth} strokeMiterlimit="10" style={{stroke}} />
		</svg>
	)
}

export default Loader
