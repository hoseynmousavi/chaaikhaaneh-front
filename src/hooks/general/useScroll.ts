import useScreen from "context/screen/hooks/useScreen"
import {useEffect} from "react"

interface Props {
	scrollCallback: () => void
	dependencies?: Array<any>
	callOnMount?: boolean
	screenMode?: "desktop" | "mobile" | "all"
}

function useScroll(props: Props) {
	const {scrollCallback, callOnMount, dependencies, screenMode = "all"} = props
	const {isMobile} = useScreen()
	const effectMobile = screenMode !== "all" && isMobile

	useEffect(() => {
		if (screenMode === "all" || (screenMode === "desktop" && !isMobile) || (screenMode === "mobile" && isMobile)) {
			if (callOnMount) {
				scrollCallback()
			}

			window.addEventListener("scroll", scrollCallback, {passive: true})
			return () => window.removeEventListener("scroll", scrollCallback)
		}
	}, [...(dependencies || []), effectMobile])
}

export default useScroll
