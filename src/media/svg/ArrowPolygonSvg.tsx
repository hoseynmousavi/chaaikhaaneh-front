import useSvg from "hooks/useSvg"
import type {RefObject} from "react"

function ArrowPolygonSvg({className, iconRef}: {className?: string; iconRef?: RefObject<SVGSVGElement | null>}) {
	return (
		<svg className={className} ref={iconRef} viewBox="0 0 9 5" fill="none">
			{useSvg(
				`<path d="M5.98659 3.34823C5.19211 4.23099 3.8079 4.231 3.01341 3.34823L4.37114e-07 -3.09968e-07L9 4.76837e-07L5.98659 3.34823Z"/>`,
				"ArrowPolygonSvg",
			)}
		</svg>
	)
}

export default ArrowPolygonSvg
