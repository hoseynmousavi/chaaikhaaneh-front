import {screenContext} from "context/screen/screenProvider"
import {use} from "react"

function useScreen() {
	const {state} = use(screenContext)
	return state
}

export default useScreen
