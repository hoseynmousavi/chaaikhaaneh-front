import URLS from "constant/routing/URLS"
import router from "helpers/router/router"

function goBackToBeforeFlow({entry}: {entry: string}) {
	const stack = router.getMemoryStack()
	let counter = 0
	for (let i = stack.length - 1; i >= 0; i--) {
		if (!new RegExp(entry.replace(/:\w+/g, ".+")).test(stack[i].location)) {
			router.back({delta: counter})
			break
		} else {
			if (i === 0) {
				router.replaceState({url: URLS.mainContainer.routes.home.routes.homeDue})
				break
			}
		}
		counter--
	}
}

export default goBackToBeforeFlow
