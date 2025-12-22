import {useLayoutEffect, useRef} from "react"

function useLayoutEffectJustChanges(callback: () => void, dependencies?: Array<any>) {
	const ref = useRef(false)

	useLayoutEffect(() => {
		if (!ref.current) {
			ref.current = true
		} else {
			return callback()
		}
	}, dependencies || [])
}

export default useLayoutEffectJustChanges
