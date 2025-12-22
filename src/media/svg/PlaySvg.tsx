import useSvg from "hooks/useSvg"

function PlaySvg({className}: {className?: string}) {
	return (
		<svg className={className} viewBox="0 0 18 18" fill="none">
			{useSvg(`<path clip-rule="evenodd" d="M3.188 4.88c0-1.658 1.63-2.721 2.985-1.945l7.932 4.546c1.443.827 1.443 3.064 0 3.89l-7.932 4.546c-1.355.777-2.986-.286-2.986-1.945V4.88z"/>`, "PlaySvg")}
		</svg>
	)
}

export default PlaySvg
