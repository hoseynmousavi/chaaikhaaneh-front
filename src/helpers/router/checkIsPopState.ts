import router from "helpers/router/router"

function checkIsPopState(e: any) {
	const {id} = e?.target?.history?.state || e?.state || {}
	const sessionHistoryStack = router.getSessionStack()
	const sessionIndex = id ? sessionHistoryStack.findIndex(item => item?.id === id) : 0
	return !id || sessionIndex !== -1
}

export default checkIsPopState
