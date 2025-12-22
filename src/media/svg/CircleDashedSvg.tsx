function CircleDashedSvg({className, color}: {className?: string; color: string}) {
	return (
		<svg className={className} viewBox="0 0 160 160" fill="none">
			<rect x="1" y="1" width="158" height="158" rx="79" stroke={color} strokeDasharray="5 6" />
		</svg>
	)
}

export default CircleDashedSvg
