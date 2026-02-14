import EmptyStateColoredSvg from "media/svg/EmptyStateColoredSvg"

interface Props {
	title: string
}

function HomeEmptyState({title}: Props) {
	return (
		<div className="home-page-tab-empty">
			<EmptyStateColoredSvg className="home-page-tab-empty-icon" />
			<div className="home-page-tab-empty-title">{title}</div>
		</div>
	)
}

export default HomeEmptyState
