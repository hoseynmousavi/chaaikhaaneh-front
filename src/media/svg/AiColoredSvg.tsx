import {useId} from "react"

function AiColoredSvg({className}: {className?: string}) {
	const id1 = useId()
	return (
		<svg className={className} viewBox="0 0 20 20" fill="none">
			<path
				d="M15.833 7.50065L16.8747 5.20898L19.1663 4.16732L16.8747 3.12565L15.833 0.833984L14.7913 3.12565L12.4997 4.16732L14.7913 5.20898L15.833 7.50065ZM9.58301 7.91732L7.49967 3.33398L5.41634 7.91732L0.833008 10.0007L5.41634 12.084L7.49967 16.6673L9.58301 12.084L14.1663 10.0007L9.58301 7.91732ZM15.833 12.5007L14.7913 14.7923L12.4997 15.834L14.7913 16.8757L15.833 19.1673L16.8747 16.8757L19.1663 15.834L16.8747 14.7923L15.833 12.5007Z"
				fill={`url(#${id1})`}
			/>
			<defs>
				<linearGradient id={id1} x1="6" y1="3.00098" x2="9.5" y2="18.501" gradientUnits="userSpaceOnUse">
					<stop stopColor="var(--ai-color-first)" />
					<stop offset="1" stopColor="var(--ai-color-second)" />
				</linearGradient>
			</defs>
		</svg>
	)
}

export default AiColoredSvg
