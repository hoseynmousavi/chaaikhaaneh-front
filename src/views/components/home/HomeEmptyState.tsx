import EmptyStateColoredSvg from "media/svg/EmptyStateColoredSvg"
import Button from "views/components/button/Button"

interface Props {
	title: string
	btn?: {
		text: string
		onClick: () => void
	}
}

function HomeEmptyState({title, btn}: Props) {
	return (
		<div className="home-page-tab-empty">
			<EmptyStateColoredSvg className="home-page-tab-empty-icon" />
			<div className="home-page-tab-empty-title">{title}</div>
			{btn && (
				<Button mobileIsRounded mobileSize="medium" onClick={btn.onClick}>
					{btn.text}
				</Button>
			)}
		</div>
	)
}

export default HomeEmptyState
