interface Props {
	color?: string
	percent: number
	haveBg?: boolean
	strokeWidth?: number
}

function CircleTimer({color = "var(--primary-color)", percent, haveBg = false, strokeWidth = 2}: Props) {
	return (
		<svg className="circle-timer" viewBox="25 25 50 50">
			<circle
				className="circle-timer-path"
				style={{stroke: color, strokeDasharray: `${(percent / 4) * 5}, 125`, opacity: !percent ? "0" : "1"}}
				cx="50"
				cy="50"
				r="20"
				fill="none"
				strokeWidth={strokeWidth}
				strokeMiterlimit="10"
			/>
			{haveBg && (
				<circle className="circle-timer-path transparent" style={{stroke: color, strokeDasharray: `125, 125`}} cx="50" cy="50" r="20" fill="none" strokeWidth={strokeWidth} strokeMiterlimit="10" />
			)}
		</svg>
	)
}

export default CircleTimer
