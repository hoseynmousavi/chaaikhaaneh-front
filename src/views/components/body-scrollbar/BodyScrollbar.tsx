import debounce from "helpers/general/debounce"
import getWindowScrollAndHeight from "helpers/general/getWindowScrollAndHeight"
import useScroll from "hooks/general/useScroll"
import {useRef} from "react"

function BodyScrollbar() {
	const scrollRef = useRef<HTMLDivElement>(null)
	const hideTimerRef = useRef(null)
	useScroll({scrollCallback: showScrollBar, screenMode: "desktop"})

	function showScrollBar() {
		const {scrollTop, clientHeight, scrollHeight} = getWindowScrollAndHeight()
		if (scrollRef.current) {
			scrollRef.current.style.removeProperty("opacity")
			scrollRef.current.style.height = `${(clientHeight / scrollHeight) * 100}%`
			scrollRef.current.style.transform = `translate3d(0, ${(scrollTop / scrollHeight) * 100}dvh, 0)`
		}

		debounce({
			delay: 500,
			func: () => {
				if (scrollRef.current) scrollRef.current.style.opacity = "0"
			},
			timerRef: hideTimerRef,
		})
	}

	return <div ref={scrollRef} className="body-scroll-bar" />
}

export default BodyScrollbar
