function configResetData() {
	window.resetData = props => {
		const event = new CustomEvent("resetData", {detail: props})
		window.dispatchEvent(event)
	}
}

function resetData({isAfterLogin}: {isAfterLogin: boolean}) {
	if (!window.resetData) {
		configResetData()
	}

	if (!isAfterLogin) {
		clearTimeout(window.refreshTokenTimer)
	}

	window.resetData?.({isAfterLogin})
}

function setResetDataListener({callBack}: {callBack: (props: {detail: {isAfterLogin: boolean}}) => void}) {
	// @ts-expect-error
	window.addEventListener("resetData", callBack, {passive: true})
}

const resetDataManager = {resetData, setResetDataListener}

export default resetDataManager
