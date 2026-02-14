import getWindowScrollAndHeight from "helpers/general/getWindowScrollAndHeight"
import useSyncedState from "hooks/general/useSyncedState"
import {useCallback, useEffect, useRef, useState} from "react"

interface useGetPaginatedDataProps {
	offset: number | undefined
	getData: (props?: {newLimit?: number | undefined; newOffset?: number | undefined}) => Promise<any>
	getDone: boolean
	dependencies?: Array<any>
	getMoreOnScroll?: boolean
	reverseScroll?: boolean
}

function useGetPaginatedData(props: useGetPaginatedDataProps) {
	const {offset, getData, getDone, dependencies, getMoreOnScroll = true, reverseScroll} = props
	const [previousOffset, setPreviousOffset, previousOffsetRef] = useSyncedState<number | undefined>(undefined)
	const cancelToken = useRef<AbortController>(null)
	const shouldInitialGet = offset === undefined
	const getMoreLoading = !shouldInitialGet && offset === previousOffset
	const [notFound, setNotFound] = useState(false)
	const [has500Err, setHas500Err] = useState(false)

	const getMore = useCallback(() => {
		if (getMoreOnScroll && !shouldInitialGet && !getDone && previousOffsetRef.current !== offset) {
			return () => {
				const preValueOfPreviousOffset = previousOffsetRef.current
				setPreviousOffset(offset)
				getData()?.catch?.(() => setPreviousOffset(preValueOfPreviousOffset))
			}
		} else {
			return null
		}
	}, [...(dependencies || []), offset, getDone, getMoreLoading])

	// handle getMore on scroll
	useEffect(() => {
		if (getMore()) {
			function onScroll() {
				const {scrollHeight, clientHeight, scrollTop} = getWindowScrollAndHeight()
				if (reverseScroll ? scrollTop <= 1500 : clientHeight + scrollTop >= scrollHeight - 1500) {
					getMore()?.()
				}
			}

			window.addEventListener("scroll", onScroll, {passive: true})
			return () => window.removeEventListener("scroll", onScroll)
		}
	}, [getMore])
	// handle getMore on scroll

	// handle getMore if initial get was not enough, and handle getMore after getting more on scroll was not enough
	useEffect(() => {
		if (getMore()) {
			const {scrollHeight, clientHeight, scrollTop} = getWindowScrollAndHeight()
			if (reverseScroll ? scrollTop <= 1000 : clientHeight + scrollTop >= scrollHeight - 1000) {
				getMore()?.()
			}
		}
	}, [offset])
	// handle getMore if initial get was not enough, and handle getMore after getting more on scroll was not enough

	useEffect(() => {
		if (shouldInitialGet && !getDone) {
			getData()?.catch?.(err => {
				setNotFound(err?.status === 404)
				setHas500Err(err?.status === 500)
			})
		}
	}, [...(dependencies || []), offset, getDone])

	useEffect(() => {
		return () => {
			cancelToken?.current?.abort?.("CANCEL")
		}
	}, [...(dependencies || [])])

	return {isLoading: (shouldInitialGet || getMoreLoading) && !notFound, cancelToken, notFound, has500Err}
}

export default useGetPaginatedData
