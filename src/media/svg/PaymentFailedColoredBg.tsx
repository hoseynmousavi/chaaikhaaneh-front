import {useId} from "react"

function PaymentFailedColoredBg({className}: {className?: string}) {
	const id = useId()
	const id1 = useId()

	return (
		<svg className={className} viewBox="0 0 360 800" fill="none">
			<g clipPath={`url(#${id})`}>
				<rect width="360" height="800" fill={`url(#${id1})`} />
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M168 88C168 94.6274 162.627 100 156 100L-3.57611 100L-37 37.6053L126.348 37.6053C129.662 37.6053 132.348 34.919 132.348 31.6053L132.348 -107L168 -107L168 88Z"
					fill="#2E2F33"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M109 116C115.627 116 121 121.373 121 128L121 306.826L51.6725 344L51.6725 161.652C51.6725 158.338 48.9862 155.652 45.6725 155.652L-109 155.652L-109 116L109 116Z"
					fill="#2E2F33"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M194 51C194 44.3726 199.373 39 206 39L372.272 39L407 103.655L237.043 103.655C233.73 103.655 231.043 106.341 231.043 109.655L231.043 166L194 166L194 51Z"
					fill="#2E2F33"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M276 143C276 136.373 281.373 131 288 131L454.272 131L489 195.655L319.043 195.655C315.73 195.655 313.043 198.341 313.043 201.655L313.043 258L276 258L276 143Z"
					fill="#2E2F33"
				/>
			</g>
			<defs>
				<linearGradient id={id1} x1="180" y1="0" x2="180" y2="800" gradientUnits="userSpaceOnUse">
					<stop stopColor="#1F262D" />
					<stop offset="1" stopColor="#2E2F33" />
				</linearGradient>
				<clipPath id={id}>
					<rect width="360" height="800" fill="white" />
				</clipPath>
			</defs>
		</svg>
	)
}

export default PaymentFailedColoredBg
