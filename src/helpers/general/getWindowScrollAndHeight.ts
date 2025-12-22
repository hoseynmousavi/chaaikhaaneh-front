function getWindowScrollAndHeight() {
	return {scrollTop: window.scrollY, clientHeight: window.innerHeight, scrollHeight: document.body.scrollHeight}
}

export default getWindowScrollAndHeight
