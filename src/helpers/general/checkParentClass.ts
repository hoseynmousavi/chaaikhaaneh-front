function checkParentClass(element: HTMLElement, classname: string): boolean {
	if (element.className && element.className.toString().split(" ").indexOf(classname) >= 0) {
		return true
	} else {
		return element.parentNode ? checkParentClass(element.parentNode as HTMLElement, classname) : false
	}
}

export default checkParentClass
