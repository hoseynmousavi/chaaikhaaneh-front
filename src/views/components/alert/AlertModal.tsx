import router from "helpers/router/router"
import type {AlertModalType} from "types/AlertModalType"
import Button from "views/components/button/Button"
import Modal from "views/components/modal/Modal"

interface Props {
	close: () => void
	data: AlertModalType
}

function AlertModal(props: Props) {
	const {close, data} = props
	const {Icon, submitType = "info", title, desc, submitText, cancelText, onSubmit} = data || {}

	function onSubmitClick() {
		router.back()
		setTimeout(onSubmit, 50)
	}

	return (
		<Modal className="alert-modal" justDesktopView close={close}>
			<div className="alert-modal-header">{Icon && <Icon className="alert-modal-header-icon" />}</div>
			<div className="alert-modal-title">{title}</div>
			{desc && <div className="alert-modal-desc">{desc}</div>}
			<Button className="alert-modal-submit" desktopType={submitType} desktopIsFullWidth desktopSize="medium" onClick={onSubmitClick}>
				{submitText}
			</Button>
			{cancelText && (
				<Button className="alert-modal-cancel" desktopType="surface-third-outline-second-on-surface-first-icon-third" desktopIsFullWidth desktopSize="medium" onClick={router.back}>
					{cancelText}
				</Button>
			)}
		</Modal>
	)
}

export default AlertModal
