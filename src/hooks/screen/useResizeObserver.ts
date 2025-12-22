import useScreen from "context/screen/hooks/useScreen"
import {type RefObject, useEffect} from "react"

interface Props {
	ref: RefObject<HTMLElement | null>
	callback: (arg: ResizeObserverEntry[]) => void
	screenMode?: "desktop" | "mobile" | "all"
	dependencies?: Array<any>
}

function useResizeObserver({ref, callback, dependencies, screenMode = "all"}: Props) {
	const {isMobile} = useScreen()
	const effectMobile = screenMode !== "all" && isMobile

	useEffect(() => {
		if (screenMode === "all" || (screenMode === "desktop" && !isMobile) || (screenMode === "mobile" && isMobile)) {
			if (ref?.current) {
				const resizeObserver = new ResizeObserver(callback)
				resizeObserver.observe(ref.current)

				return () => resizeObserver.disconnect()
			}
		}
	}, [...(dependencies || []), effectMobile])
}

export default useResizeObserver
