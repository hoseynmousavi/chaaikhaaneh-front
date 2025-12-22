let hideCount = 0

function changeBodyOverflow(makeHide: boolean) {
	if (makeHide) {
		hideCount++
		document.body.style.overflow = "hidden"
		document.body.style.touchAction = "none"
		document.body.style.overscrollBehavior = "none"
	} else {
		hideCount--
		if (hideCount === 0) {
			document.body.style.removeProperty("overflow")
			document.body.style.removeProperty("touch-action")
			document.body.style.removeProperty("overscroll-behavior")
		}
	}
}

export default changeBodyOverflow
