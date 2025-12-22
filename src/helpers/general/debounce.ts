import type {RefObject} from "react"

function debounce({timerRef, func, delay}: {timerRef: RefObject<null | ReturnType<typeof setTimeout>>; func: () => void; delay: number}) {
	if (timerRef.current) {
		clearTimeout(timerRef.current)
	}
	timerRef.current = setTimeout(func, delay)
}

export default debounce
