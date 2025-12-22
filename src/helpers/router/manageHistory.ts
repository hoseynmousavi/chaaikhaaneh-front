import checkIsPopState from "helpers/router/checkIsPopState"
import getFullUrl from "helpers/router/getFullUrl"

function manageHistory() {
	const currentUrl = getFullUrl().fullUrl

	const sessionHistoryStack: Array<{id: null | string; location: string}> = JSON.parse(sessionStorage.getItem("history-stack") || "[]")
	const memoryHistoryStack: Array<{id: null | string; location: string}> = []

	const lastSession = sessionHistoryStack[sessionHistoryStack.length - 1]

	if (lastSession?.location !== currentUrl) {
		sessionHistoryStack.push({id: null, location: currentUrl})
		memoryHistoryStack.push({id: null, location: currentUrl})
	} else {
		memoryHistoryStack.push(lastSession)
	}
	save()

	function popstate(e: any) {
		const {id} = e?.target?.history?.state || e?.state || {}
		const sessionIndex = id ? sessionHistoryStack.findIndex(item => item?.id === id) : 0
		const memoryIndex = id ? memoryHistoryStack.findIndex(item => item?.id === id) : 0
		const isPopState = checkIsPopState(e)
		if (isPopState) {
			const sessionDelta = sessionHistoryStack.length - 1 - sessionIndex
			sessionHistoryStack.splice(-sessionDelta, sessionDelta)
			const memoryDelta = memoryHistoryStack.length - 1 - memoryIndex
			memoryHistoryStack.splice(-memoryDelta, memoryDelta)
		} else {
			const currentUrl = getFullUrl().fullUrl
			sessionHistoryStack.push({id, location: currentUrl})
			memoryHistoryStack.push({id, location: currentUrl})
		}
		save()
	}

	function pushstate(e: any) {
		const {id} = e?.target?.history?.state ?? {}
		const currentUrl = getFullUrl().fullUrl
		sessionHistoryStack.push({id, location: currentUrl})
		memoryHistoryStack.push({id, location: currentUrl})
		save()
	}

	function replacestate(e: any) {
		const {id} = e?.target?.history?.state ?? {}
		const currentUrl = getFullUrl().fullUrl
		sessionHistoryStack.pop()
		sessionHistoryStack.push({id, location: currentUrl})
		memoryHistoryStack.pop()
		memoryHistoryStack.push({id, location: currentUrl})
		save()
	}

	function save() {
		sessionStorage.setItem("history-stack", JSON.stringify(sessionHistoryStack))
		window.sessionHistoryStack = sessionHistoryStack
		window.memoryHistoryStack = memoryHistoryStack
	}

	window.addEventListener("popstate", popstate, {passive: true})
	window.addEventListener("pushstate", pushstate, {passive: true})
	window.addEventListener("replacestate", replacestate, {passive: true})
}

export default manageHistory
