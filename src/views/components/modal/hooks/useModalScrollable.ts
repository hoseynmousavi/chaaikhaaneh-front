import useResizeObserver from "hooks/screen/useResizeObserver"
import type {RefObject} from "react"

function useModalScrollable({ref}: {ref: RefObject<HTMLElement | null>}) {
	useResizeObserver({ref, callback})

	function callback() {
		if (ref.current) {
			const isScrollable = ref.current.scrollHeight > ref.current.clientHeight
			if (isScrollable) {
				ref.current.style.touchAction = "auto"
			} else {
				ref.current.style.removeProperty("touch-action")
			}
		}
	}
}

export default useModalScrollable
