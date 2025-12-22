import {useId} from "react"

function LoadingBorderSvg({className}: {className?: string}) {
	const id1 = useId()
	return (
		<svg className={className} viewBox="0 0 124 124" fill="none">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M62 4C29.9675 4 4 29.9675 4 62C4 94.0325 29.9675 120 62 120C94.0325 120 120 94.0325 120 62C120 29.9675 94.0325 4 62 4ZM0 62C0 27.7583 27.7583 0 62 0C96.2417 0 124 27.7583 124 62C124 96.2417 96.2417 124 62 124C27.7583 124 0 96.2417 0 62Z"
				fill={`url(#${id1})`}
			/>
			<defs>
				<linearGradient id={id1} x1="62" y1="2" x2="62" y2="62" gradientUnits="userSpaceOnUse">
					<stop stopColor="var(--primary-color)" />
					<stop offset="1" stopOpacity="0" />
				</linearGradient>
			</defs>
		</svg>
	)
}

export default LoadingBorderSvg
