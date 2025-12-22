function checkParentIsScrolling(element: HTMLElement) {
	if (element.scrollTop > 0) {
		return true
	} else if (element.parentNode && element.parentNode !== document.body) {
		return checkParentIsScrolling(element.parentNode as HTMLElement)
	} else {
		return false
	}
}

export default checkParentIsScrolling
