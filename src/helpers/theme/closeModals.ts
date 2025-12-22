import router from "helpers/router/router"

function closeModals() {
	return new Promise<void>(resolve => {
		if (window.screenState?.modalStackCount) {
			for (let i = 0; i < window.screenState.modalStackCount; i++) {
				router.back()
			}
			resolve()
		} else {
			resolve()
		}
	})
}

export default closeModals
