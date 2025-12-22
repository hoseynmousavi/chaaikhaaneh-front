import type {AlertModalType} from "types/AlertModalType"

function configAlertManager() {
	window.openAlertModal = (props: AlertModalType) => {
		const event = new CustomEvent("openAlertModal", {detail: props})
		window.dispatchEvent(event)
	}
}

function openAlertModal(props: AlertModalType) {
	if (!window.openAlertModal) {
		configAlertManager()
	}

	window.openAlertModal(props)
}

function subscribeOpenAlertModal({callback}: {callback: (e: CustomEventInit<AlertModalType>) => void}) {
	window.addEventListener("openAlertModal", callback, {passive: true})
	return () => window.removeEventListener("openAlertModal", callback)
}

const alertManager = {openAlertModal, subscribeOpenAlertModal}

export default alertManager
