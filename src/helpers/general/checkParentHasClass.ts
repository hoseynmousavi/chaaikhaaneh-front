function checkParentHasClass(element: HTMLElement, classname: string) {
	if (element.className && element.className.toString().split(" ").indexOf(classname) >= 0) {
		return true
	} else if (element.parentNode) {
		return checkParentHasClass(element.parentNode as HTMLElement, classname)
	} else {
		return false
	}
}

export default checkParentHasClass
