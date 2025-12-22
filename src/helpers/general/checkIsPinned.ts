import type {RefObject} from "react"

function checkIsPinned({ref, callback}: {ref: RefObject<HTMLElement | null>; callback: (isNotVisible: boolean) => void}) {
	if (ref.current) {
		const observer = new IntersectionObserver(([e]) => callback(e.intersectionRatio < 1), {threshold: [1]})
		observer.observe(ref.current)

		return () => observer.disconnect()
	}
}

export default checkIsPinned
