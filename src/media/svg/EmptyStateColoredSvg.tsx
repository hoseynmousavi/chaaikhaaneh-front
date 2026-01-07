import {useId} from "react"

function EmptyStateColoredSvg({className}: {className?: string}) {
	const id1 = useId()
	const id2 = useId()
	return (
		<svg className={className} viewBox="0 0 562 252" fill="none">
			<g clipPath={`url(#${id1})`}>
				<rect width="562" height="252" rx="12" fill="var(--surface-third)" />
				<g filter={`url(#${id2})`}>
					<rect x="88" y="48" width="386" height="423.002" rx="8" fill="var(--surface-fourth)" shapeRendering="crispEdges" />
					<rect x="88.5" y="48.5" width="385" height="422.002" rx="7.5" stroke="var(--surface-second)" shapeRendering="crispEdges" />
					<rect width="355.114" height="67.0005" transform="translate(102.886 60)" fill="var(--surface-fourth)" />
					<rect x="114.053" y="85.0322" width="48.3892" height="16.9362" rx="8.46811" fill="var(--surface-first)" />
					<rect x="277.471" y="78.9834" width="120.973" height="9.67784" rx="2.79169" fill="var(--surface-first)" />
					<rect x="220.509" y="98.3389" width="177.935" height="9.67784" rx="2.79169" fill="var(--surface-second)" />
					<rect x="408.122" y="74.1445" width="38.7114" height="38.7114" rx="5.58337" fill="var(--surface-second)" />
					<line x1="102.886" y1="134.5" x2="458" y2="134.5" stroke="var(--surface-second)" />
					<rect width="355.114" height="67.0005" transform="translate(102.886 143)" fill="var(--surface-fourth)" />
					<rect x="114.053" y="168.032" width="48.3892" height="16.9362" rx="8.46811" fill="var(--surface-first)" />
					<rect x="277.471" y="162.635" width="120.973" height="9.67784" rx="2.79169" fill="var(--surface-first)" />
					<rect x="220.509" y="180.688" width="177.935" height="9.67784" rx="2.79169" fill="var(--surface-second)" />
					<rect x="408.122" y="157.145" width="38.7114" height="38.7114" rx="5.58337" fill="var(--surface-second)" />
					<line x1="102.886" y1="217.501" x2="458" y2="217.501" stroke="var(--surface-second)" />
					<rect width="355.114" height="67.0005" transform="translate(102.886 226.001)" fill="var(--surface-fourth)" />
					<rect x="114.053" y="251.033" width="48.3892" height="16.9362" rx="8.46811" fill="var(--surface-first)" />
					<rect x="277.471" y="245.636" width="120.973" height="9.67784" rx="2.79169" fill="var(--surface-first)" />
					<rect x="408.122" y="240.146" width="38.7114" height="38.7114" rx="5.58337" fill="var(--surface-second)" />
				</g>
			</g>
			<rect x="0.5" y="0.5" width="561" height="251" rx="11.5" stroke="var(--outline-third)" />
			<defs>
				<filter id={id2} x="57.8527" y="23.8054" width="445.181" height="481.069" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
					<feOffset dy="4.83892" />
					<feGaussianBlur stdDeviation="14.5168" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix type="matrix" values="0 0 0 0 0.100377 0 0 0 0 0.209268 0 0 0 0 0.298361 0 0 0 0.08 0" />
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2126_2516" />
					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2126_2516" result="shape" />
				</filter>
				<clipPath id={id1}>
					<rect width="562" height="252" rx="12" fill="var(--surface-fourth)" />
				</clipPath>
			</defs>
		</svg>
	)
}

export default EmptyStateColoredSvg
