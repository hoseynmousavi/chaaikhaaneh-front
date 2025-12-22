import uuidGenerator from "helpers/general/uuidGenerator"

const stackOfListeners: Array<{id: string; level: number; callback: Function}> = []

if (typeof window !== "undefined") {
	function callChangeRoute(e: any) {
		for (let i = 0; i < stackOfListeners.length; i++) {
			const sendNext = stackOfListeners[i].callback(e)
			if (!sendNext) break
		}
	}

	window.addEventListener("popstate", callChangeRoute)
	window.addEventListener("pushstate", callChangeRoute)
	window.addEventListener("replacestate", callChangeRoute)
}

function changeRouter({level, callback}: {level: number; callback: Function}) {
	const id = uuidGenerator()
	stackOfListeners.unshift({id, level, callback})
	stackOfListeners.sort((a, b) => a.level - b.level)

	return () => {
		stackOfListeners.splice(
			stackOfListeners.findIndex(item => item.id === id),
			1,
		)
	}
}

export default changeRouter
