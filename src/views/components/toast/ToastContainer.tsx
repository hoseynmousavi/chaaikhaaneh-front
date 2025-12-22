import onPageLoaded from "helpers/general/onPageLoaded"
import uuidGenerator from "helpers/general/uuidGenerator"
import toastManager from "helpers/theme/toastManager"
import {lazy, Suspense, startTransition, useEffect, useRef, useState} from "react"
import type {CreatedToastType, HTMLDivElementWithClear} from "types/ToastType"
import EmptyErrorBoundary from "views/error-boundaries/EmptyErrorBoundary"

const Toast = lazy(() => import("views/components/toast/Toast"))

function ToastContainer() {
	const [pageLoaded, setPageLoaded] = useState(false)
	const [activeToasts, setActiveToasts] = useState<Array<CreatedToastType>>([])
	const itemsRef = useRef<{[key: string]: HTMLDivElementWithClear}>({})

	useEffect(() => {
		onPageLoaded({callback: () => setPageLoaded(true)})
	}, [])

	useEffect(() => {
		function onToast({detail}: CustomEventInit<CreatedToastType>) {
			if (detail) {
				const {id = uuidGenerator(), message, description, type = "INFO", onClick, haveClose = true, Icon, removeOnChangeLocation = true} = detail
				startTransition(() =>
					setActiveToasts(activeToasts => {
						const preSames = activeToasts.filter(item => item.message === message)
						preSames.forEach(item => {
							itemsRef.current[item.id]?.clearItem?.()
						})
						return [{id, message, description, type, onClick, haveClose, Icon, removeOnChangeLocation}, ...activeToasts]
					}),
				)
			}
		}

		return toastManager.subscribeAddToast({callback: onToast})
	}, [])

	function clearItem(id: string) {
		setActiveToasts(activeToasts => activeToasts.filter(item => item.id !== id))
	}

	return (
		<div className="toast-container">
			<EmptyErrorBoundary>
				<Suspense fallback={null}>{pageLoaded && activeToasts.map(item => <Toast key={item.id} itemsRef={itemsRef} item={item} clearMe={clearItem} />)}</Suspense>
			</EmptyErrorBoundary>
		</div>
	)
}

export default ToastContainer
