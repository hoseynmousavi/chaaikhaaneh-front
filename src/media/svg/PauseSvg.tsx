import useSvg from "hooks/useSvg"

function PauseSvg({className}: {className?: string}) {
	return (
		<svg className={className} viewBox="0 0 18 18" fill="none">
			{useSvg(
				`<path fill-rule="evenodd" clip-rule="evenodd" d="M2.4375 3.75C2.4375 2.61091 3.36091 1.6875 4.5 1.6875H6C7.13909 1.6875 8.0625 2.61091 8.0625 3.75V14.25C8.0625 15.3891 7.13909 16.3125 6 16.3125H4.5C3.36091 16.3125 2.4375 15.3891 2.4375 14.25V3.75Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9.9375 3.75C9.9375 2.61091 10.8609 1.6875 12 1.6875H13.5C14.6391 1.6875 15.5625 2.61091 15.5625 3.75V14.25C15.5625 15.3891 14.6391 16.3125 13.5 16.3125H12C10.8609 16.3125 9.9375 15.3891 9.9375 14.25V3.75Z"/>`,
				"PauseSvg",
			)}
		</svg>
	)
}

export default PauseSvg
