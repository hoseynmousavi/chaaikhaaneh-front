import useScreen from "context/screen/hooks/useScreen"
import onPopState from "helpers/router/onPopState"
import getComputedStyleHelper from "helpers/theme/getComputedStyleHelper"
import {useEffect, useRef} from "react"
import type {ModalImperativeRef, ModalType} from "types/ModalType"
import DesktopModal from "views/components/modal/DesktopModal"
import MobileModal from "views/components/modal/MobileModal"
import ModalErrorBoundary from "views/error-boundaries/ModalErrorBoundary"

function Modal(props: ModalType) {
	const {mobileRootClassName = "", className = "", backClassName = "", children, close, statusBarColor, justDesktopView, root, desktopRoot, mobileRoot, disableClose, anchorOrigin, anchorRef} = props
	const {isMobile} = useScreen()
	const modalRef = useRef<ModalImperativeRef>({})

	useEffect(() => {
		onPopState({
			statusBarColor: statusBarColor ? statusBarColor : getComputedStyleHelper("--first-modal-status-color"),
			callback: () => {
				modalRef.current?.desktopClose?.()
				modalRef.current?.mobileClose?.()
			},
		})
	}, [])

	if (isMobile && !justDesktopView) {
		return (
			<MobileModal mobileRootClassName={mobileRootClassName} className={className} backClassName={backClassName} close={close} ref={modalRef} root={mobileRoot || root} disableClose={disableClose}>
				<ModalErrorBoundary>{children}</ModalErrorBoundary>
			</MobileModal>
		)
	} else {
		return (
			<DesktopModal
				className={className}
				backClassName={backClassName}
				close={close}
				ref={modalRef}
				root={desktopRoot || root}
				disableClose={disableClose}
				anchorRef={anchorRef}
				anchorOrigin={anchorOrigin}
			>
				<ModalErrorBoundary>{children}</ModalErrorBoundary>
			</DesktopModal>
		)
	}
}

export default Modal
