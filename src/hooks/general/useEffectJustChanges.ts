import {useEffect, useRef} from "react"

function useEffectJustChanges(callback: () => void, dependencies?: Array<any>) {
	const ref = useRef(false)

	useEffect(() => {
		if (!ref.current) {
			ref.current = true
		} else {
			return callback?.()
		}
	}, dependencies || [])
}

export default useEffectJustChanges
