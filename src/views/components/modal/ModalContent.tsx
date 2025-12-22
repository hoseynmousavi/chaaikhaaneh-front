import {type ReactNode, type UIEventHandler, useRef} from "react"
import useModalScrollable from "views/components/modal/hooks/useModalScrollable"

interface Props {
	children: ReactNode
	onScroll: UIEventHandler
}

function ModalContent(props: Props) {
	const {children, onScroll} = props
	const contRef = useRef<HTMLDivElement>(null)
	useModalScrollable({ref: contRef})
	return (
		<div className="modal-wrapper-content" ref={contRef} onScroll={onScroll}>
			{children}
		</div>
	)
}

export default ModalContent
