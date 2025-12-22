import dataShareManager, {type DataShareProps} from "request/dataShareManager"

const onGoingReqs: Record<string, boolean> = {}

function handleRepeat({reqUrl}: {reqUrl: string}) {
	return new Promise((resolve, reject) => {
		function onDataEvent({detail}: CustomEventInit<DataShareProps>) {
			const {status, dataReqUrl, data} = detail || {}
			if (reqUrl === dataReqUrl) {
				if (status === "OK") resolve(data)
				else reject(data)
			}
		}

		dataShareManager.subscribeDataShare({callback: onDataEvent})
	})
}

function checkRepeating({reqUrl}: {reqUrl: string}) {
	if (typeof window === "undefined") {
		return false
	} else {
		const isRepeating: boolean = onGoingReqs[reqUrl]
		if (!isRepeating) onGoingReqs[reqUrl] = true
		return isRepeating
	}
}

function broadCastIfNeeded({reqUrl, data, isOk}: {reqUrl: string; data?: any; isOk: boolean}) {
	if (onGoingReqs[reqUrl]) {
		dataShareManager.dataShare({status: isOk ? "OK" : "NOK", dataReqUrl: reqUrl, data: typeof structuredClone !== "undefined" ? structuredClone(data) : typeof data === "object" ? {...data} : data})
		delete onGoingReqs[reqUrl]
	}
}

const handleOnGoingRequests = {handleRepeat, checkRepeating, broadCastIfNeeded}

export default handleOnGoingRequests
