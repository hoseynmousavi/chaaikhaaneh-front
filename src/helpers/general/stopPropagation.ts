import type {MouseEvent, TouchEvent} from "react"

function stopPropagation(e: MouseEvent | TouchEvent) {
	e?.stopPropagation()
}

export default stopPropagation
