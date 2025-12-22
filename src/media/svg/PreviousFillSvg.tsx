import useSvg from "hooks/useSvg"

function PreviousFillSvg({className}: {className?: string}) {
	return (
		<svg className={className} viewBox="0 0 25 24" fill="none">
			{useSvg(
				`<path fill-rule="evenodd" clip-rule="evenodd" d="M16.4808 5.32733C18.3126 4.35037 20.5249 5.67777 20.5249 7.7538L20.5249 17.0871C20.5249 19.1632 18.3126 20.4906 16.4808 19.5136L7.73078 14.8469C5.78961 13.8116 5.78961 11.0293 7.73078 9.994L16.4808 5.32733Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M3.25 5C2.83579 5 2.5 5.33579 2.5 5.75L2.5 18.25C2.5 18.6642 2.83579 19 3.25 19C3.66421 19 4 18.6642 4 18.25L4 5.75C4 5.33579 3.66421 5 3.25 5Z"/>`,
				"PreviousFillSvg",
			)}
		</svg>
	)
}

export default PreviousFillSvg
