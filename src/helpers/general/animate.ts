interface AnimateProps {
	element: HTMLElement
	keyframes: Keyframe[] | PropertyIndexedKeyframes
	options: number | KeyframeAnimationOptions
	beforeRunAnimate?: () => void
}

function animate({element, keyframes, options, beforeRunAnimate}: AnimateProps) {
	return new Promise<Animation>((resolve, reject) => {
		if (element.animate && !!element.animate({}).finished) {
			beforeRunAnimate?.()
			resolve(element.animate(keyframes, options))
		} else {
			reject()
		}
	})
}

export default animate
