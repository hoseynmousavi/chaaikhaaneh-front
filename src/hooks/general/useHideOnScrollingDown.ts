import useGetIsScrollingDown from "context/scroll/hooks/useGetIsScrollingDown"
import useCheckIfLocationMatch from "hooks/general/useCheckIfLocationMatch"

interface Props {
	hidePages?: Array<string | {entry: string; routes: {[key: string]: string}}>
	showPages?: Array<string>
	listenScroll?: boolean
	reverse?: boolean
}

function useHideOnScrollingDown({hidePages, showPages, listenScroll = true, reverse = false}: Props) {
	const isScrollingDown = useGetIsScrollingDown()
	const hideInThisPage = !useCheckIfLocationMatch({blackLocations: hidePages, whiteLocations: showPages})

	return {hideInThisPage, hideOnScroll: listenScroll ? (reverse ? !isScrollingDown : isScrollingDown) : false}
}

export default useHideOnScrollingDown
