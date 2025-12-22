import {type Dispatch, type RefObject, type SetStateAction, useRef, useState} from "react"

function useSyncedState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>, RefObject<S>] {
	const [state, _setState] = useState(initialState)
	const stateRef = useRef(state)

	function setState(newState: SetStateAction<S>) {
		stateRef.current = typeof newState === "function" ? (newState as (prevState: S) => S)(stateRef.current) : newState
		_setState(stateRef.current)
	}

	return [state, setState, stateRef]
}

export default useSyncedState
