import type {ReactNode} from "react"
import type {ComponentAsPropsType} from "types/ComponentAsPropsType"

interface Props {
	isPinned?: boolean
	title?: string | ReactNode
	Icon?: ComponentAsPropsType
}

function ModalHeader(props: Props) {
	const {isPinned, title, Icon} = props
	return (
		<div className={`modal-wrapper-header ${isPinned ? "is-pinned" : ""}`}>
			{Icon && <Icon className="modal-wrapper-header-icon" />}
			<div className="modal-wrapper-header-title">{title}</div>
		</div>
	)
}

export default ModalHeader
