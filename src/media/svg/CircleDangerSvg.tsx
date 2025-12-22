import useSvg from "hooks/useSvg"

function CircleDangerSvg({className}: {className?: string}) {
	return (
		<svg className={className} viewBox="0 0 16 16">
			{useSvg(
				`<path d="M8 9.224a.5.5 0 0 1-.5-.5V4.9a.5.5 0 0 1 1 0v3.824a.5.5 0 0 1-.5.5zM8.67 10.767a.667.667 0 0 1-.667.666h-.006a.667.667 0 1 1 0-1.333h.006c.368 0 .667.299.667.667z"/><path d="M8 1.833a6.167 6.167 0 1 0 0 12.334A6.167 6.167 0 0 0 8 1.833zM.833 8a7.167 7.167 0 1 1 14.334 0A7.167 7.167 0 0 1 .833 8z"/>`,
				"CircleDangerSvg",
			)}
		</svg>
	)
}

export default CircleDangerSvg
