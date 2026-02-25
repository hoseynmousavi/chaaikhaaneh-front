import type {RefObject} from "react"

function intersectionHelper({
	threshold,
	ref,
	callback,
}: {
	threshold: number
	ref: RefObject<null | HTMLElement>
	callback: ({isShowing}: {isShowing: boolean}) => void
}) {
	let observer: IntersectionObserver | undefined

	setTimeout(() => {
		observer = new IntersectionObserver(
			([e]) => {
				const isShowing = e.intersectionRatio >= threshold
				callback({isShowing})
			},
			{threshold: [threshold]},
		)

		if (ref.current) observer.observe(ref.current)
	}, 0)

	return () => observer?.disconnect()
}

export default intersectionHelper
