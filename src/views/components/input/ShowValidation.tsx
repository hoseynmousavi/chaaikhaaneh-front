import type {ReactNode} from "react"
import type {ComponentAsPropsType} from "types/ComponentAsPropsType"

interface Props {
	text?: string | ReactNode
	isError?: boolean
	Icon?: ComponentAsPropsType
}

function ShowValidation(props: Props) {
	const {text, isError, Icon} = props
	return (
		<div className={`validation-err ${isError ? "error" : "success"} ${text ? "show" : ""}`}>
			{Icon && text && <Icon className="validation-err-icon" />}
			{text}
		</div>
	)
}

export default ShowValidation
