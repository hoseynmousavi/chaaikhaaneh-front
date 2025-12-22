export interface DataShareProps {
	status: "OK" | "NOK"
	dataReqUrl: string
	data: any
}

const config = () => {
	window.dataShare = (props: DataShareProps) => {
		const event = new CustomEvent("dataShare", {detail: props})
		window.dispatchEvent(event)
	}
}

function dataShare(props: DataShareProps) {
	if (!window.dataShare) {
		config()
	}

	window.dataShare(props)
}

function subscribeDataShare({callback}: {callback: (e: CustomEventInit<DataShareProps>) => void}) {
	window.addEventListener("dataShare", callback, {passive: true, once: true})
}

const dataShareManager = {dataShare, subscribeDataShare}

export default dataShareManager
