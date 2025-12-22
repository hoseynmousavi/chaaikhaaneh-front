import {scrollContext} from "context/scroll/scrollProvider"
import {use} from "react"

function useGetIsScrollingDown() {
	const {isScrollingDown} = use(scrollContext)
	return isScrollingDown
}

export default useGetIsScrollingDown
