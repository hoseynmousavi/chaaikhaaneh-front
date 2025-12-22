import getWindowScrollAndHeight from "helpers/general/getWindowScrollAndHeight"
import useScroll from "hooks/general/useScroll"
import useSyncedState from "hooks/general/useSyncedState"
import {createContext, type ReactNode, startTransition, useRef} from "react"

// @ts-expect-error - ok
export const scrollContext = createContext<{isScrollingDown: boolean}>(null)

function ScrollProvider({children}: {children: ReactNode}) {
	const [isScrollingDown, setIsScrollingDown, isScrollingDownRef] = useSyncedState(false)
	const scrollYRef = useRef(0)
	const scrollDiff = useRef(0)
	useScroll({scrollCallback, screenMode: "mobile"})

	function scrollCallback() {
		const {scrollTop, clientHeight, scrollHeight} = getWindowScrollAndHeight()
		const scrollY = Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight))
		if (scrollY > scrollYRef.current) {
			if (scrollDiff.current >= 0) scrollDiff.current += scrollY - scrollYRef.current
			else scrollDiff.current = 0
		} else {
			if (scrollDiff.current <= 0) scrollDiff.current -= scrollYRef.current - scrollY
			else scrollDiff.current = 0
		}

		const bodyScrollHeight = scrollHeight - +(getComputedStyle(document.body).padding.split(" ").pop() ?? "").replace("px", "")
		const activateEffect = bodyScrollHeight - clientHeight > 400
		const reachedStart = scrollY <= 0
		const reachedEnd = scrollY + clientHeight > bodyScrollHeight - 250
		const margin = 56

		if (scrollDiff.current <= -margin || !activateEffect || reachedEnd || reachedStart) {
			if (isScrollingDownRef.current) {
				startTransition(() => setIsScrollingDown(false))
			}
		} else if (scrollDiff.current >= margin) {
			if (!isScrollingDownRef.current) {
				startTransition(() => setIsScrollingDown(true))
			}
		}
		scrollYRef.current = scrollY
	}

	return <scrollContext.Provider value={{isScrollingDown}}>{children}</scrollContext.Provider>
}

export default ScrollProvider
