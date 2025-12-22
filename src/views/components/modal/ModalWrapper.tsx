import {type JSXElementConstructor, type ReactNode, type UIEvent, useState} from "react"
import ModalContent from "views/components/modal/ModalContent"
import ModalHeader from "views/components/modal/ModalHeader"

interface Props {
	header?: {title?: string | ReactNode; Icon?: JSXElementConstructor<{className?: string}>}
	subHeader?: ReactNode
	subFooter?: ReactNode
	children: ReactNode
}

function ModalWrapper(props: Props) {
	const {header, subHeader, subFooter, children} = props
	const {title, Icon} = header || {}
	const [isPinned, setIsPinned] = useState(false)

	function onScroll(e: UIEvent) {
		setIsPinned(e.currentTarget.scrollTop > 0)
	}

	return (
		<div className="modal-wrapper">
			{header && <ModalHeader isPinned={isPinned} title={title} Icon={Icon} />}
			{!!subHeader && subHeader}
			<ModalContent onScroll={onScroll}>{children}</ModalContent>
			{!!subFooter && subFooter}
		</div>
	)
}

export default ModalWrapper
