import useSvg from "hooks/useSvg"

function ArrowLeftSvg({className}: {className?: string}) {
	return (
		<svg className={className} viewBox="0 0 20 21" fill="none">
			{useSvg(
				`<path d="M12.4996 6.0875C12.1746 5.7625 11.6496 5.7625 11.3246 6.0875L7.49961 9.9125C7.17461 10.2375 7.17461 10.7625 7.49961 11.0875L11.3246 14.9125C11.6496 15.2375 12.1746 15.2375 12.4996 14.9125C12.8246 14.5875 12.8246 14.0625 12.4996 13.7375L9.26628 10.4958L12.4996 7.2625C12.8246 6.9375 12.8163 6.40417 12.4996 6.0875Z"/>`,
				"ArrowLeftSvg",
			)}
		</svg>
	)
}

export default ArrowLeftSvg
