function RectangleDashedSvg({className, color}: {className?: string; color: string}) {
	return (
		<svg className={className} viewBox="0 0 652 384" fill="none">
			<rect x="1" y="1" width="650" height="382" rx="11" stroke={color} strokeDasharray="7 8" />
		</svg>
	)
}

export default RectangleDashedSvg
