import useSvg from "hooks/useSvg"

function MyListOutlineSvg({className}: {className?: string}) {
	return (
		<svg className={className} viewBox="0 0 18 20" fill="none">
			{useSvg(
				`<path clip-rule="evenodd" d="M3.834 7.04a3.75 3.75 0 0 1 3.75-3.75h6.5a3.75 3.75 0 0 1 3.75 3.75v10.913a1.75 1.75 0 0 1-2.506 1.578l-4.386-2.1a.25.25 0 0 0-.216 0l-4.386 2.1a1.75 1.75 0 0 1-2.506-1.578V7.04zm3.75-2.25a2.25 2.25 0 0 0-2.25 2.25v10.913a.25.25 0 0 0 .358.225l4.386-2.1a1.75 1.75 0 0 1 1.511 0l4.387 2.1a.25.25 0 0 0 .358-.226V7.04a2.25 2.25 0 0 0-2.25-2.25h-6.5z"/><path clip-rule="evenodd" d="M14.834 4.045a3.75 3.75 0 0 0-3.75-3.75h-6.5a3.75 3.75 0 0 0-3.75 3.75v10.913a1.75 1.75 0 0 0 2.506 1.578l1.693-.81-.648-1.353-1.693.81a.25.25 0 0 1-.358-.225V4.045a2.25 2.25 0 0 1 2.25-2.25h6.5a2.25 2.25 0 0 1 2.25 2.25v.695h1.5v-.695z"/><path clip-rule="evenodd" d="M8.09 9.25a.75.75 0 0 1 .75-.75h3.987a.75.75 0 0 1 0 1.5H8.84a.75.75 0 0 1-.75-.75z"/>`,
				"MyListOutlineSvg",
			)}
		</svg>
	)
}

export default MyListOutlineSvg
