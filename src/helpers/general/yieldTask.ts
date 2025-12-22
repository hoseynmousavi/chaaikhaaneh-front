function yieldTask() {
	if ("scheduler" in window && "yield" in window.scheduler) {
		return window.scheduler.yield()
	} else {
		return new Promise(resolve => setTimeout(resolve, 0))
	}
}

export default yieldTask
