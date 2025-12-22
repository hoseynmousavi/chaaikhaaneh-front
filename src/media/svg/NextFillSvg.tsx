import useSvg from "hooks/useSvg"

function NextFillSvg({className}: {className?: string}) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="none">
			{useSvg(
				`<path fill-rule="evenodd" clip-rule="evenodd" d="M7.29412 4.90741C5.46233 3.93045 3.25 5.25785 3.25 7.33388L3.25 16.6672C3.25 18.7432 5.46232 20.0706 7.29412 19.0937L16.0441 14.427C17.9853 13.3917 17.9853 10.6094 16.0441 9.57407L7.29412 4.90741Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M20.75 5C21.1642 5 21.5 5.33579 21.5 5.75L21.5 18.25C21.5 18.6642 21.1642 19 20.75 19C20.3358 19 20 18.6642 20 18.25L20 5.75C20 5.33579 20.3358 5 20.75 5Z"/>`,
				"NextFillSvg",
			)}
		</svg>
	)
}

export default NextFillSvg
