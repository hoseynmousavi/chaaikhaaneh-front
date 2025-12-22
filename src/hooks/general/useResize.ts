import useScreen from "context/screen/hooks/useScreen"
import {useLayoutEffect} from "react"

interface Props {
	resizeCallback: () => void
	dependencies?: Array<any>
	screenMode?: "desktop" | "mobile" | "all"
	callOnMount?: boolean
}

function useResize(props: Props) {
	const {resizeCallback, callOnMount, dependencies, screenMode = "all"} = props
	const {isMobile} = useScreen()
	const effectMobile = screenMode !== "all" && isMobile

	useLayoutEffect(() => {
		if (screenMode === "all" || (screenMode === "desktop" && !isMobile) || (screenMode === "mobile" && isMobile)) {
			if (callOnMount) {
				resizeCallback()
			}

			window.addEventListener("resize", resizeCallback, {passive: true})
			return () => window.removeEventListener("resize", resizeCallback)
		}
	}, [...(dependencies || []), effectMobile])
}

export default useResize
