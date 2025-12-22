import useSvg from "hooks/useSvg"
import type {CSSProperties} from "react"

function CheckBoxTickSvg({className, style}: {className?: string; style?: CSSProperties}) {
	return (
		<svg className={className} style={style} viewBox="0 0 12 12" fill="none">
			{useSvg(
				`<path fill-rule="evenodd" clip-rule="evenodd" d="M10.2272 2.77599C10.5655 3.08043 10.5929 3.60145 10.2885 3.93971L5.75155 8.98073C5.20701 9.58577 4.2587 9.58709 3.71248 8.98356L1.71307 6.77436C1.40769 6.43694 1.43367 5.91585 1.77109 5.61047C2.10851 5.30509 2.6296 5.33106 2.93498 5.66848L4.73017 7.65204L9.06349 2.83724C9.36793 2.49897 9.88895 2.47155 10.2272 2.77599Z"/>`,
				"CheckBoxTickSvg",
			)}
		</svg>
	)
}

export default CheckBoxTickSvg
