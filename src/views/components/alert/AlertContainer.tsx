import alertManager from "helpers/alert/alertManager"
import {lazy, Suspense, useEffect, useState} from "react"
import type {AlertModalType} from "types/AlertModalType"

const AlertModal = lazy(() => import("views/components/alert/AlertModal"))

function AlertContainer() {
	const [isModalOpen, setIsModalOpen] = useState<AlertModalType | null>(null)

	useEffect(() => {
		function onAlertModal({detail: props}: CustomEventInit<AlertModalType>) {
			setIsModalOpen(props || null)
		}

		return alertManager.subscribeOpenAlertModal({callback: onAlertModal})
	}, [])

	function close() {
		setIsModalOpen(null)
	}

	if (isModalOpen) {
		return (
			<Suspense fallback={null}>
				<AlertModal close={close} data={isModalOpen} />
			</Suspense>
		)
	}
}

export default AlertContainer
